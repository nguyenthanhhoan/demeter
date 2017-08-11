class AlertService

  def get_job_name(alert_rule_id)
    "AlertRule_#{alert_rule_id}"
  end

  def update_job(alert_rule)
    if alert_rule.is_active
      time_zone = alert_rule.zone.time_zone
      job_name = get_job_name(alert_rule.id)

      remove_job(alert_rule)
      job = Sidekiq::Cron::Job.new({
        name: job_name,
        cron: "#{alert_rule.schedule} #{time_zone}",
        class: 'AlertRuleWorker',
        args: [alert_rule.id]
      })

      if job.valid?
        job.save
      else
        job.errors
      end
    else
      remove_job(alert_rule)
    end
  end

  def remove_job(alert_rule)
    job_name = get_job_name(alert_rule.id)
    Sidekiq::Cron::Job.destroy job_name
  end

  def execute(alert_rule_id)
    alert_rule = AlertRule.find alert_rule_id
    zone = alert_rule.zone
    time_zone = zone.time_zone

    unless alert_rule.is_active
      #
      # alert_rule is not active
      # Destroy the job
      #
      Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] is not active. Prepare to destroy the job"
      job_name = get_job_name(alert_rule_id)
      Sidekiq::Cron::Job.destroy job_name
      return
    end

    unless TimeService.new.in_period?(alert_rule.from_time, alert_rule.to_time, time_zone)
      Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] not in period. Skip running"
      return
    end

    Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] is about to perform"

    # Try to get latest value from device first
    DeviceService.new.update_latest_value(alert_rule.device_field)

    if rule_match?(alert_rule, zone.device_gateway)
      Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] alert rule match. Prepare to create alert"
      create_alert(alert_rule, zone)
      email_alert(alert_rule)
    else 
      Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] alert rule not match. Alert wont be created"
    end
  end

  def rule_match?(alert_rule, device_gateway)
    device_field = alert_rule.device_field
    ransack_operator = alert_rule.condition
    ransack_query = {
      id_eq: alert_rule.device_field_id,
      device_name_eq: device_gateway
    }

    if device_field.integer?
      ransack_query["value_in_int_#{ransack_operator}"] = Integer(alert_rule[:value])
    elsif device_field.float?
      ransack_query["value_in_float_#{ransack_operator}"] = Float(alert_rule[:value])
    end
    DeviceField.ransack(ransack_query).result.count > 0
  end

  def create_alert(alert_rule, zone)
    alert_content = build_alert_message(alert_rule)
    Alert.create({
      alert_rule: alert_rule,
      zone: zone,
      alert_content: alert_content,
      icon: alert_rule.device_field.icon
    })
  end

  def build_alert_message(alert_rule)
    alert_value = alert_rule.value
    device_field = alert_rule.device_field
    alert_content = ""
    # TODO: Currently, assume that read_write field is ON/OFF field
    if device_field.read_write? && device_field.integer?
      alert_value = device_field.value_in_int == 1 ? 'ON' : 'OFF'
      alert_content = "#{alert_rule.device_field.name_display} is #{alert_value}"
    else

      mapping_operator = {
        'eq': 'equal',
        'gt': 'greater than',
        'gteq': 'greater than or equal',
        'lt': 'less than',
        'lteq': 'less than or equal'
      }
      operator = mapping_operator[alert_rule.condition.to_sym]
      alert_content = "#{alert_rule.device_field.name_display} is #{operator} #{alert_rule.value}"
    end
    alert_content
  end

  def email_alert(alert_rule)
    alert_content = build_alert_message(alert_rule)
    if alert_rule.trigger_email?
      emails = alert_rule.trigger_emails.split(';')
      emails.each { |email| 
        AlertMailer.send_email(alert_rule, alert_content, email).deliver_later
      }
    end
  end
end

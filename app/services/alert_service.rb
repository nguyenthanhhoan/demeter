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

    Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] is about to perform"

    if rule_match?(alert_rule, zone.device_gateway)
      Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] alert rule match. Prepare to create alert"
      create_alert(alert_rule, zone)
    else 
      Rails.logger.info "[AlertRuleWorker] [alert_rule_id=#{alert_rule_id}] alert rule not match. Alert wont be created"
    end
  end

  def rule_match?(alert_rule, device_gateway)
    ransack_operator = alert_rule.condition
    ransack_query = {
      id_eq: alert_rule.device_field_id,
      "value_in_int_#{ransack_operator}": Integer(alert_rule[:value]),
      device_name_eq: device_gateway
    }
    DeviceField.ransack(ransack_query).result.count > 0
  end

  def create_alert(alert_rule, zone)
    alert_content = "#{alert_rule.device_field.name_display} is #{alert_rule.value}"
    Alert.create({
      alert_rule: alert_rule,
      zone: zone,
      alert_content: alert_content,
      icon: alert_rule.device_field.icon
    })
  end
end

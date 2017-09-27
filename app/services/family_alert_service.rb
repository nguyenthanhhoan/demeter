class FamilyAlertService
  def get_job_name(alert_id)
    "FamilyAlert_#{alert_id}"
  end

  def build_cron(interval, time_zone)
    schedule = "*/#{interval} * * * *"
     "#{schedule} #{time_zone}"
  end

  def update_job(alert)
    time_zone = 'Asia/Ho_Chi_Minh'
    job_name = get_job_name(alert.id)

    remove_job(alert)
    job = Sidekiq::Cron::Job.new({
      name: job_name,
      cron: build_cron(alert.interval, time_zone),
      class: 'FamilyAlertWorker',
      args: [alert.id]
    })

    if job.valid?
      job.save
    else
      job.errors
    end
  end

  def remove_job(alert)
    job_name = get_job_name(alert.id)
    Sidekiq::Cron::Job.destroy job_name
  end

  def execute(alert_id)
    alert = Family::ProjectAlert.find alert_id
    rules_parsed = JSON.parse(alert.rules,:symbolize_names => true)
    rules_parsed.each { |rule|
      if rule_match?(rule)
        Rails.logger.info "[FamilyAlertService] [alert_id=#{alert_id}] alert rule match. Prepare to create alert"
        create_notification(alert, rule)
        email_alert(alert, rule)
        message_alert(alert, rule)
      else 
        Rails.logger.info "[FamilyAlertService] [alert_id=#{alert_id}] alert rule not match. Alert wont be created"
      end
    }
  end

  def rule_match?(rule)
    device = Family::Device.find_by_uuid rule[:device_uuid]
    if device.read_write?
      if device.value_parsed == rule[:value]
        return true
      end
    elsif device.read_only?
      if rule[:condition] === 'gt' && device.value_parsed > rule[:value]
        return true
      end
      if rule[:condition] === 'lt' && device.value_parsed < rule[:value]
        return true
      end
    end
    false
  end

  def create_notification(alert, rule)
    alert_content = build_alert_message(rule)
    project = Family::Project.find alert.family_project_id
    Family::Notification.create({
      user: project.user,
      noti_type: :alert,
      content: alert_content
    })
  end

  def build_alert_message(rule)
    device = Family::Device.find_by_uuid rule[:device_uuid]
    alert_content = ""
    if device.read_write?
      alert_value = device.value_parsed == 1 ? 'ON' : 'OFF'
      alert_content = "#{device.name} is #{alert_value}"
    else
      mapping_operator = {
        gt: 'greater than',
        lt: 'less than'
      }
      operator = mapping_operator[rule[:condition].to_sym]
      alert_content = "#{device.name} is #{operator} #{rule[:value]}"
    end
    alert_content
  end

  def email_alert(alert, rule)
    alert_content = build_alert_message(rule)
    if alert.trigger_email?
      emails = alert.trigger_emails.split(';')
      emails.each { |email| 
        FamilyAlertMailer.send_email(alert, alert_content, email).deliver_later
      }
    end
  end

  def message_alert(alert, rule)
    alert_content = build_alert_message(rule)
    if alert.trigger_message?
      phones = alert.trigger_messages.split(';')
      phones.map { |phone| 
        phone.strip
      }
      SpeedSMSService.new.send_message(alert_content, phones)
    end
  end
end

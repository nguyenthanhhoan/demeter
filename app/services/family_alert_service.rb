class FamilyAlertService

  def trigger_alert(device)
    package = device.package

    # This package hasnot used in any project
    return if package.family_project_id.blank?

    alert = Family::ProjectAlert.find_by_family_project_id package.family_project_id

    # This project haven't create alert yet!
    return if alert.blank?
    rules_parsed = JSON.parse(alert.rules, :symbolize_names => true)
    rules_parsed.each { |rule|
      if rule[:device_uuid] == device.uuid && rule_match?(rule, alert)
        Rails.logger.info "[FamilyAlertService] [alert_id=#{alert.id}][package=#{package.serial_name}] alert rule match. Prepare to create alert"
        create_notification(alert, rule)
        email_alert(alert, rule)
        message_alert(alert, rule)
        rule[:last_alert] = Time.new.to_i
      else 
        Rails.logger.info "[FamilyAlertService] [alert_id=#{alert.id}][package=#{package.serial_name}] alert rule not match. Alert wont be created"
      end
    }
    alert.update_attribute(:rules, rules_parsed.to_json)
  end

  def rule_match?(rule, alert)
    first_time_or_timeout?(rule, alert.interval * 60, Time.new.to_i) && rule_match_content?(rule)
  end

  def rule_match_content?(rule)
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

  # Check if the rule run first time, or after a defined timeout
  # If not, donot need to create alert
  def first_time_or_timeout?(rule, timeout, current_time)
    return true if rule[:last_alert].blank?
    return true if current_time - rule[:last_alert] > timeout
    false
  end

  def create_notification(alert, rule)
    alert_content = build_alert_message(rule)
    project = Family::Project.find alert.family_project_id
    NotificationService.new.create_notification_family_project(project.user, :alert, alert_content, project)
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
    alert_content = "D-Family Alert\n"
    alert_content += build_alert_message(rule)
    device = Family::Device.find_by_uuid rule[:device_uuid]
    if device.read_only?
      alert_content += "\nCurrent #{device.name} is #{device.value_parsed}"
    end
    device = Family::Device.find_by_uuid rule[:device_uuid]
    if alert.trigger_message?
      phones = alert.trigger_messages.split(';')
      phones.map { |phone| 
        phone.strip
      }
      SpeedSMSService.new.send_message(alert_content, phones)
    end
  end
end

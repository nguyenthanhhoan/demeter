class AlertMailer < ApplicationMailer

  def send_email(alert_rule, message, email)
    @alert_rule_name = alert_rule.name
    @zone_name = alert_rule.zone.name
    @zone_id = alert_rule.zone.hash_id
    @project_id = alert_rule.zone.project.hash_id
    @message = message
    @deploy_path = ENV['DEPLOYED_PATH']
    mail(to: email, subject: 'Demeter Alert!')
  end
end

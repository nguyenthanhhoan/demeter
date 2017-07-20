class AlertRuleWorker
  include Sidekiq::Worker

  def perform(alert_rule_id)
    AlertService.new.execute(alert_rule_id)
  end
end

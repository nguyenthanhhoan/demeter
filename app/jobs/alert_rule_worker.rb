class AlertRuleWorker
  include Sidekiq::Worker

  def perform(program_execution_id)
    AlertRuleService.new.execute(program_execution_id)
  end
end

class ProgramExecutionWorker
  include Sidekiq::Worker

  def perform(program_execution_id)
    ProgramExecutionService.new.execute(program_execution_id)
  end
end

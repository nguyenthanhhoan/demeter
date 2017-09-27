class FamilyAlertWorker
  include Sidekiq::Worker

  def perform(alert_id)
    FamilyAlertService.new.execute(alert_id)
  end
end

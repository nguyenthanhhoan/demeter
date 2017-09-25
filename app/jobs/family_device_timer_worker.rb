class FamilyDeviceTimerWorker
  include Sidekiq::Worker

  def perform(device_id, schedule_id, type)
    device = Family::Device.find device_id
    FamilyDeviceTimerService.new(device).execute(schedule_id, type)
  end
end

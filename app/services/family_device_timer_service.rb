class FamilyDeviceTimerService
  
  def initialize(device)
    @device = device
    @timers = JSON.parse(device.timer_daily_schedule)
  end
  def get_job_name(device_id, schedule_id, type)
    "FamilyDeviceTimer_#{device_id}_#{schedule_id}_#{type.to_s}"
  end

  def update_job
    remove_jobs()
    # TODO: Get from user config
    time_zone = 'Asia/Ho_Chi_Minh'

    @timers.each { |schedule|
      schedule_id = schedule['id']
      add_job(schedule['from_time'], time_zone, schedule_id, :from_time)
      add_job(schedule['to_time'], time_zone, schedule_id, :to_time)
    }
  end

  def add_job(time, time_zone, schedule_id, type)
    hour = time.split(':')[0]
    minute = time.split(':')[1]
    job_name = get_job_name(@device.id, schedule_id, type)
    job = Sidekiq::Cron::Job.new({
      name: job_name,
      cron: "#{minute} #{hour} * * * #{time_zone}",
      class: 'FamilyDeviceTimerWorker',
      args: [@device.id, schedule_id, type]
    })
    if job.valid?
      job.save
    else
      Rails.logger.info "[FamilyDeviceTimerService] Cannot create job: #{job.errors.to_s}"
    end
  end

  def remove_job(device, schedule_id, type)
    job_name = get_job_name(device.id, schedule_id, type)

    found_job = Sidekiq::Cron::Job.find(job_name)
    if found_job.present?
      found_job.destroy
    end
  end

  def remove_jobs()
    @timers.each { |schedule|
      remove_job(@device, schedule['id'], :from_time)
      remove_job(@device, schedule['id'], :to_time)
    }
  end

  def execute(schedule_id, type)
    if matched_rule?(schedule_id)
      Rails.logger.info "[FamilyDeviceTimerService] Rule matched for device: #{@device.id}: match_rule.to_s"
      gateway = @device.package.hash_id

      desired_value = false
      if type.to_sym === :from_time
        desired_value = true
      end
      AwsIotService.update_thing_shadow_v2(gateway, @device, desired_value)
    else
      Rails.logger.info "[FamilyDeviceTimerService] No rule match for device: #{@device.id} #{schedule_id}"
      remove_job(@device, schedule_id, type.to_sym)
    end
  end

  def matched_rule?(schedule_id)
    current_time = Time.new.in_time_zone("Asia/Ho_Chi_Minh").strftime('%H:%M')
    match_rule = @timers.find { |schedule|
      schedule['id'] === schedule_id
    }
    Rails.logger.info "[matched_rule] #{match_rule.to_json}"

    if match_rule.present?
      # TODO: Should check delta between (current_time vs start_time, to_time)
      if match_rule['is_active']
        return true
      end
    end
    false
  end

end
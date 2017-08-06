class TimeService
  def in_period?(from_time, to_time, time_zone)
    if from_time.present? && to_time.present?
      current_time = Time.current.in_time_zone(time_zone)
      from_time_tz = from_time.in_time_zone(time_zone)
      to_time_tz = to_time.in_time_zone(time_zone)
      from_time_tz <= current_time && to_time_tz >= current_time
    else
      #
      # If period not set (from_time or to_time is nil)
      # The job can run
      #
      true
    end
  end
end
class TimeService
  def in_period?(from_time, to_time, time_zone)
    current_time = Time.current.in_time_zone(time_zone)
    from_time_tz = from_time.in_time_zone(time_zone)
    to_time_tz = to_time.in_time_zone(time_zone)
    from_time_tz <= current_time && to_time_tz >= current_time
  end
end
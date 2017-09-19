class FamilyDeviceSerializer < ApplicationSerializer
  attributes :uuid, :field_id, :name, :value, :value_updated_at,
    :value_data_type, :field_attribute, :chart_value_suffix, :mode,
    :timer_start_date, :timer_end_date, :timer_daily_schedule, :events

  def timer_start_date
    date_to_iso(object.timer_start_date)
  end

  def timer_end_date
    date_to_iso(object.timer_end_date)
  end

  def timer_daily_schedule
    if object.timer_daily_schedule.present?
      JSON.parse(object.timer_daily_schedule)
    end
  end
end

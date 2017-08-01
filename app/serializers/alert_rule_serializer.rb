class AlertRuleSerializer < ApplicationSerializer
  attributes :id, :name, :device_field, :device_field_id, :zone_id, :schedule,
      :condition, :value, :interval, :live_chart_rule, :is_active,
      :from_time, :to_time, :trigger_email, :trigger_emails,
      :trigger_message, :trigger_messages, :trigger_call, :trigger_calls

  def from_time
    time_to_s(object.from_time)
  end

  def to_time
    time_to_s(object.to_time)
  end
end

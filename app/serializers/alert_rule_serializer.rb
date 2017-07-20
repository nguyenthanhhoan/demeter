class AlertRuleSerializer < ActiveModel::Serializer
  attributes :id, :name, :device_field_id, :zone_id, :schedule,
      :condition, :value, :interval, :live_chart_rule, :is_active
end

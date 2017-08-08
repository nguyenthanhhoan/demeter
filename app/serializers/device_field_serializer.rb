class DeviceFieldSerializer < ActiveModel::Serializer
  attributes :id, :field_id, :name, :name_display, :description,
      :value, :value_updated_at, :value_data_type, :update_rate,
      :interval, :last_updated, :status, :field_attribute,
      :chart_value_suffix, :chart_value_diff, :device, :icon
end

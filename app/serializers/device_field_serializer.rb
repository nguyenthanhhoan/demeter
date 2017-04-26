class DeviceFieldSerializer < ActiveModel::Serializer
  attributes :id, :field_id, :name, :name_display, :description,
      :value, :value_data_type,
      :interval, :last_updated, :status, :field_attribute
end

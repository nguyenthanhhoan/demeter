class FamilyDeviceSerializer < ActiveModel::Serializer
  attributes :id, :field_id, :name, :value, :value_updated_at,
    :value_data_type, :field_attribute, :chart_value_suffix
end

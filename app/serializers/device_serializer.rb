class DeviceSerializer < ActiveModel::Serializer
  attributes :id, :name, :device_type, :api
  has_one :created_by
end

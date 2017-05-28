class DeviceFieldsZone < ApplicationRecord
  belongs_to :zone
  belongs_to :device_field

  enum link_type: [ :summary, :control ]
end

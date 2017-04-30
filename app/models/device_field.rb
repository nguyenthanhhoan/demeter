class DeviceField < ApplicationRecord
  has_and_belongs_to_many :zones
  belongs_to :device

  enum status: [ :fail, :ok ]
  enum update_type: [ :field_interval, :field_changed ]
  enum field_attribute: [ :read_only, :read_write ]
  enum value_data_type: [ :integer, :float, :string ]
end

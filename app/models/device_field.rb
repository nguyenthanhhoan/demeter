class DeviceField < ApplicationRecord
  belongs_to :device

  enum status: [ :fail, :ok ]
  enum field_attribute: [ :read_only, :read_write ]
  enum value_data_type: [ :integer, :float, :string ]
end

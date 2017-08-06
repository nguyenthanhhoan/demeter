class DeviceField < ApplicationRecord
  belongs_to :device

  enum status: [ :fail, :ok ]
  enum field_attribute: [ :read_only, :read_write ]

  #
  # Need to duplicate data_type 
  # In order to optimize ransack query
  #
  enum value_data_type: [ :integer, :float, :string ]
end

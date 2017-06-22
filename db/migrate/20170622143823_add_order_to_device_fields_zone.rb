class AddOrderToDeviceFieldsZone < ActiveRecord::Migration[5.0]
  def change
    add_column :device_fields_zones, :order, :integer
  end
end

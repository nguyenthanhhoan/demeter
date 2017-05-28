class AddIdToDeviceFieldsZone < ActiveRecord::Migration[5.0]
  def change
    add_column :device_fields_zones, :id, :primary_key
  end
end

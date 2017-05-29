class EditDeviceFieldZoneIndex < ActiveRecord::Migration[5.0]
  def change
    remove_index :device_fields_zones, column: [:device_field_id, :zone_id]

    add_index :device_fields_zones, [:device_field_id, :zone_id, :link_type],
      name: "device_fields_zones_index",
      unique: true
  end
end

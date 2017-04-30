class CreateDeviceFieldsZones < ActiveRecord::Migration
  def change
    create_table :device_fields_zones, :id => false do |t|
      t.references :device_field
      t.references :zone
    end

    add_index :device_fields_zones, [:device_field_id, :zone_id],
      name: "device_fields_zones_index",
      unique: true
  end
end

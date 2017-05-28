class AddLinkTypeToDeviceFieldsZone < ActiveRecord::Migration[5.0]
  def change
    add_column :device_fields_zones, :link_type, :integer, default: 0
  end
end

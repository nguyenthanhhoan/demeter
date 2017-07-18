class AddIconToDeviceField < ActiveRecord::Migration[5.0]
  def change
    add_column :device_fields, :icon, :string
  end
end

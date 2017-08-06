class AddValueUpdatedAtToDeviceField < ActiveRecord::Migration[5.0]
  def change
    add_column :device_fields, :value_updated_at, :datetime
  end
end

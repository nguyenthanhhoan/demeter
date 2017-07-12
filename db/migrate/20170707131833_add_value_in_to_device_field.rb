class AddValueInToDeviceField < ActiveRecord::Migration[5.0]
  def change
    add_column :device_fields, :value_in_int, :integer
    add_column :device_fields, :value_in_float, :float
  end
end

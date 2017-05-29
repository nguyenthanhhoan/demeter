class AddChartDataToDeviceField < ActiveRecord::Migration[5.0]
  def change
    add_column :device_fields, :chart_value_suffix, :string
    add_column :device_fields, :chart_value_diff, :float
  end
end

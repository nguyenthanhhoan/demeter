class AddChartValueDiffToFamilyDevice < ActiveRecord::Migration[5.0]
  def change
    add_column :family_devices, :chart_value_diff, :float
  end
end

class AddSettingToZone < ActiveRecord::Migration[5.0]
  def change
    add_column :zones, :setting, :string
  end
end

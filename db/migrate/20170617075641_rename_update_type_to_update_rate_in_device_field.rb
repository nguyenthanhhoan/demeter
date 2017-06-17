class RenameUpdateTypeToUpdateRateInDeviceField < ActiveRecord::Migration[5.0]
  def change
    rename_column :device_fields, :update_type, :update_rate
  end
end

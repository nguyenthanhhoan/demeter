class FamilyDeviceControl < ActiveRecord::Migration[5.0]
  def change
    add_column :family_devices, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :family_devices, :timer_start_date, :datetime
    add_column :family_devices, :timer_end_date, :datetime
    add_column :family_devices, :timer_daily_schedule, :json
    add_column :family_devices, :events, :json
  end
end

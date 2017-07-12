class ChangeTimeZoneDefaultValueToZone < ActiveRecord::Migration[5.0]
  def change
    change_column_default(:zones, :time_zone, 'Asia/Ho_Chi_Minh')
  end
end

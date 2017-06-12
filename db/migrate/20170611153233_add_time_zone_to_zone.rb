class AddTimeZoneToZone < ActiveRecord::Migration[5.0]
  def change
    add_column :zones, :time_zone, :string, :default => 'Hanoi'
  end
end

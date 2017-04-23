class AddIdToCamerasZones < ActiveRecord::Migration[5.0]
  def change
    add_column :cameras_zones, :id, :primary_key
  end
end

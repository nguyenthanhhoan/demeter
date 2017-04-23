class AddIsPrimaryToCamerasZones < ActiveRecord::Migration[5.0]
  def change
    add_column :cameras_zones, :is_primary, :boolean
  end
end

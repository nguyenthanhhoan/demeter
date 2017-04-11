class CreateCamerasZones < ActiveRecord::Migration
  def change
    create_table :cameras_zones, :id => false do |t|
      t.references :camera
      t.references :zone
    end

    add_index :cameras_zones, [:camera_id, :zone_id],
      name: "cameras_zones_index",
      unique: true
  end
end

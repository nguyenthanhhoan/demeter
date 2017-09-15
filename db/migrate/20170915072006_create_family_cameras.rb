class CreateFamilyCameras < ActiveRecord::Migration[5.0]
  def change
    create_table :family_cameras do |t|
      t.references :family_package_camera, foreign_key: true
      t.string :live_hash
      t.string :playback_hash
      t.string :secret_id
      t.string :channel
      t.string :server

      t.timestamps
    end
  end
end

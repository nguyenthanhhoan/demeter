class CreateCameras < ActiveRecord::Migration[5.0]
  def change
    create_table :cameras do |t|
      t.string :camera_no
      t.string :camera_name
      t.integer :api, :default => 0
      t.string :live_hash
      t.string :playback_hash
      t.string :secret_id
      t.string :channel
      t.string :server

      t.timestamps
    end
  end
end

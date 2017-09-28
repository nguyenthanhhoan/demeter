class UpdateFamilyCameras < ActiveRecord::Migration[5.0]
  def change
    remove_column :family_cameras, :live_hash
    remove_column :family_cameras, :playback_hash
    remove_column :family_cameras, :secret_id
    remove_column :family_cameras, :channel
    remove_column :family_cameras, :server

    add_column :family_cameras, :name, :string
    add_column :family_cameras, :rtsp_url, :string
    add_column :family_cameras, :hash_id, :string
    add_column :family_cameras, :main, :boolean, :default => false
    add_reference :family_cameras, :family_project, foreign_key: true
  end
end

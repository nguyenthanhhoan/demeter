class AddRtmpToFamilyCamera < ActiveRecord::Migration[5.0]
  def change
    add_column :family_cameras, :rtmp_url, :string
  end
end

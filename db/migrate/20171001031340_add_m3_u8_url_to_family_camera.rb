class AddM3U8UrlToFamilyCamera < ActiveRecord::Migration[5.0]
  def change
    add_column :family_cameras, :m3u8_url, :string
  end
end

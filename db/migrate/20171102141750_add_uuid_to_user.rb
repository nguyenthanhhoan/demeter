class AddUuidToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :family_notifications, :image_url, :string
  end
end

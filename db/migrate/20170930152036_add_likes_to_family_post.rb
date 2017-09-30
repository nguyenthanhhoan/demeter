class AddLikesToFamilyPost < ActiveRecord::Migration[5.0]
  def change
    add_column :family_posts, :likes, :json, default: []
    add_column :family_posts, :like_count, :integer, default: 0
    add_column :family_posts, :trending, :boolean, default: false
  end
end

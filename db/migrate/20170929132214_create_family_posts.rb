class CreateFamilyPosts < ActiveRecord::Migration[5.0]
  def change
    create_table :family_posts do |t|
      t.string :title
      t.text :content
      t.string :picture
      t.references :family_topic, foreign_key: true

      t.timestamps
    end
  end
end

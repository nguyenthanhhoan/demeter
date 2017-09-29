class CreateFamilyTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :family_topics do |t|
      t.string :title
      t.string :picture

      t.timestamps
    end
  end
end

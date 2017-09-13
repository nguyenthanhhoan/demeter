class CreateFamilyProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :family_projects do |t|
      t.string :name
      t.string :package_id
      t.string :camera_id
      t.string :image
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end

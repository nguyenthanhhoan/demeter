class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.float :surface
      t.integer :labour
      t.string :location

      t.timestamps
    end
  end
end

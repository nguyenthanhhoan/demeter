class CreateFamilyPackages < ActiveRecord::Migration[5.0]
  def change
    create_table :family_packages do |t|
      t.string :salt
      t.integer :length
      t.string :setting
      t.string :hash_id

      t.timestamps
    end
  end
end

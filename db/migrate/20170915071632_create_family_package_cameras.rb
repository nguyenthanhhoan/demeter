class CreateFamilyPackageCameras < ActiveRecord::Migration[5.0]
  def change
    create_table :family_package_cameras do |t|
      t.string :salt
      t.integer :length
      t.string :hash_id

      t.timestamps
    end
  end
end

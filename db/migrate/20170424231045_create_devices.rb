class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|
      t.string :name
      t.integer :device_type
      t.integer :api
      t.references :created_by

      t.timestamps
    end
  end
end

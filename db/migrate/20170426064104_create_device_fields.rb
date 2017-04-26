class CreateDeviceFields < ActiveRecord::Migration[5.0]
  def change
    create_table :device_fields do |t|
      t.references :device, foreign_key: true
      t.string :field_id
      t.string :name
      t.string :name_display
      t.string :description
      t.string :value
      t.integer :interval
      t.datetime :last_updated
      t.integer :status
      t.integer :field_attribute
      t.integer :value_data_type
      t.integer :update_type

      t.timestamps
    end
  end
end

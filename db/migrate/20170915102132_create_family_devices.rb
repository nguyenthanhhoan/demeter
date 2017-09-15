class CreateFamilyDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :family_devices do |t|
      t.references :family_package, foreign_key: true
      t.string :name
      t.string :value
      t.integer :value_in_int
      t.float :value_in_float
      t.string :field_id
      t.datetime :value_updated_at
      t.integer :field_attribute
      t.integer :value_data_type
      t.string :chart_value_suffix
      t.integer :mode

      t.timestamps
    end
  end
end

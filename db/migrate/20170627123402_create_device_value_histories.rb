class CreateDeviceValueHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :device_value_histories do |t|
      t.references :device_field, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end

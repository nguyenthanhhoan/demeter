class CreateOkrs < ActiveRecord::Migration[5.0]
  def change
    create_table :okrs do |t|
      t.references :zone, foreign_key: true
      t.integer :order
      t.string :name

      t.timestamps
    end
  end
end

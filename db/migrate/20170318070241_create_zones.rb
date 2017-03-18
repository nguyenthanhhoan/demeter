class CreateZones < ActiveRecord::Migration[5.0]
  def change
    create_table :zones do |t|
      t.references :project, foreign_key: true
      t.string :name
      t.string :zone_id
      t.date :start_date
      t.date :end_date
      t.string :plant
      t.string :plant_variety
      t.integer :plant_quantity
      t.string :plant_quantity_unit
      t.string :production_type
      t.float :estimate_yield
      t.string :estimate_yield_unit
      t.float :surface
      t.string :surface_unit
      t.string :zone_type
      t.string :growing_condition_type
      t.string :ownership_type
      t.integer :labour
      t.string :location

      t.timestamps
    end
  end
end

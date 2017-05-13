class CreateOkrObjectiveKeys < ActiveRecord::Migration[5.0]
  def change
    create_table :okr_objective_keys do |t|
      t.references :okr_objective, foreign_key: true
      t.text :description
      t.integer :status
      t.string :pic
      t.date :start_date
      t.date :original_deadline
      t.date :deadline1
      t.text :note

      t.timestamps
    end
  end
end

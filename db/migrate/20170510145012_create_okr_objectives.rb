class CreateOkrObjectives < ActiveRecord::Migration[5.0]
  def change
    create_table :okr_objectives do |t|
      t.references :okr, foreign_key: true
      t.date :date_from
      t.date :date_to
      t.string :objective

      t.timestamps
    end
  end
end

class CreateProgramExecutions < ActiveRecord::Migration[5.0]
  def change
    create_table :program_executions do |t|
      t.string :name
      t.references :zone, foreign_key: true
      t.boolean :is_active
      t.string :input
      t.string :output

      t.timestamps
    end
  end
end

class CreateAlerts < ActiveRecord::Migration[5.0]
  def change
    create_table :alerts do |t|
      t.references :alert_rule, foreign_key: true
      t.references :zone, foreign_key: true
      t.string :alert_content
      t.string :icon

      t.timestamps
    end
  end
end

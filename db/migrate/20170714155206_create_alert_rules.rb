class CreateAlertRules < ActiveRecord::Migration[5.0]
  def change
    create_table :alert_rules do |t|
      t.string :name
      t.references :device_field, foreign_key: true
      t.references :zone, foreign_key: true
      t.string :condition
      t.string :value
      t.integer :interval
      t.boolean :live_chart_rule
      t.boolean :is_active

      t.timestamps
    end
  end
end

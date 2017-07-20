class AddScheduleToAlertRule < ActiveRecord::Migration[5.0]
  def change
    add_column :alert_rules, :schedule, :string
  end
end

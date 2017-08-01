class AddEffectivePeriodToAlertRule < ActiveRecord::Migration[5.0]
  def change
    add_column :alert_rules, :from_time, :datetime
    add_column :alert_rules, :to_time, :datetime
    add_column :alert_rules, :trigger_email, :boolean
    add_column :alert_rules, :trigger_emails, :string
    add_column :alert_rules, :trigger_message, :boolean
    add_column :alert_rules, :trigger_messages, :string
    add_column :alert_rules, :trigger_call, :boolean
    add_column :alert_rules, :trigger_calls, :string
  end
end

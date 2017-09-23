class CreateFamilyProjectAlerts < ActiveRecord::Migration[5.0]
  def change
    create_table :family_project_alerts do |t|
      t.references :family_project, foreign_key: true
      t.json :rules
      t.integer :interval
      t.boolean :trigger_notification
      t.string :trigger_notifications
      t.boolean :trigger_email
      t.string :trigger_emails
      t.boolean :trigger_message
      t.string :trigger_messages

      t.timestamps
    end
  end
end

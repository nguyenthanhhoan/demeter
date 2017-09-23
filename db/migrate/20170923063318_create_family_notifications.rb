class CreateFamilyNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :family_notifications do |t|
      t.references :user, foreign_key: true
      t.integer :alert_type
      t.string :alert_content

      t.timestamps
    end
  end
end

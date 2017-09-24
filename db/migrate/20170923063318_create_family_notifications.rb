class CreateFamilyNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :family_notifications do |t|
      t.references :user, foreign_key: true
      t.integer :noti_type
      t.string :content

      t.timestamps
    end
  end
end

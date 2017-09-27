class AddIsReadToFamilyNotification < ActiveRecord::Migration[5.0]
  def change
    add_column :family_notifications, :is_read, :boolean, :default => false
  end
end

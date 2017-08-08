class AddUserToZone < ActiveRecord::Migration[5.0]
  def change
    add_reference :zones, :user, foreign_key: true
  end
end

class CreateInvitations < ActiveRecord::Migration[5.0]
  def change
    create_table :invitations do |t|
      t.string :email
      t.integer :role
      t.string :token
      t.string :resource_name
      t.integer :resource_id

      t.timestamps
    end
  end
end

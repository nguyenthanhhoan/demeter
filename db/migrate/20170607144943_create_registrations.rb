class CreateRegistrations < ActiveRecord::Migration[5.0]
  def change
    create_table :registrations do |t|
      t.string :email
      t.string :phone
      t.string :address

      t.timestamps
    end
  end
end

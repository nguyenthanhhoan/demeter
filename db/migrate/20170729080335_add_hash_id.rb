class AddHashId < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :hash_id, :string
    add_column :zones, :hash_id, :string
    add_column :device_fields, :hash_id, :string
  end
end

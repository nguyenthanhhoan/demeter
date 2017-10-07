class UseUuidForPackage < ActiveRecord::Migration[5.0]
  def change
    add_column :family_packages, :uuid, :uuid, default: "gen_random_uuid()", null: false
    rename_column :family_packages, :hash_id, :serial_name
    remove_column :family_packages, :salt, :string
    remove_column :family_packages, :length, :int
  end
end

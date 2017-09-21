class RemovePackageId < ActiveRecord::Migration[5.0]
  def change
    remove_column :family_projects, :package_id
    remove_column :family_projects, :camera_id
  end
end

class AddProjectToPackage < ActiveRecord::Migration[5.0]
  def change
    add_reference :family_packages, :family_project, foreign_key: true
    add_reference :family_package_cameras, :family_project, foreign_key: true
  end
end

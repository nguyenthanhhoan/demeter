class AddLocationGeometryToProjectsAndZones < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :location_geometry, :string
    add_column :zones, :location_geometry, :string
  end
end

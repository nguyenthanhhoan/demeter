class AddImageToZones < ActiveRecord::Migration[5.0]
  def change
    add_column :zones, :image, :string
  end
end

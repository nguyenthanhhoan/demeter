class AddSettingToFamilyProject < ActiveRecord::Migration[5.0]
  def change
    add_column :family_projects, :setting, :json
  end
end

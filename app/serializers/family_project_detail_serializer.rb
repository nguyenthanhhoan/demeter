class FamilyProjectDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :package_id, :setting

  has_one :package
  has_many :cameras, serializer: FamilyCameraSerializer
  def package_id
    object.package.serial_name
  end

  def setting
    if object.setting.present?
      JSON.parse(object.setting)
    else 
      {}
    end
  end
end

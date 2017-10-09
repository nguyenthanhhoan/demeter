class FamilyProjectDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :package_id

  has_one :package
  has_many :cameras, serializer: FamilyCameraSerializer
  def package_id
    object.package.serial_name
  end
end

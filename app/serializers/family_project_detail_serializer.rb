class FamilyProjectDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :package_id

  has_one :package
  has_one :package_camera
  def package_id
    object.package.hash_id
  end
end

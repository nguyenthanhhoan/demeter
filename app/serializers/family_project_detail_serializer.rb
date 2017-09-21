class FamilyProjectDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :image

  has_one :package
  has_one :package_camera
end

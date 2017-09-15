class FamilyProjectDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :package_id, :camera_id, :image

  has_one :package
  has_one :package_camera
end

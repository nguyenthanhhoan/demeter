class FamilyProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :camera_id, :image
  has_one :package_camera
  has_one :package
end

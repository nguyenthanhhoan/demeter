class FamilyProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :package_id, :camera_id, :image
end

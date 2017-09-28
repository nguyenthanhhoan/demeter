class FamilyProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :image
  has_one :package
end

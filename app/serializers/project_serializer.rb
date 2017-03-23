class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :surface, :labour, :location, :image
  has_one :user
end

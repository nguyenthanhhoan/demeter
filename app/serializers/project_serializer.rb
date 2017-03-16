class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :surface, :labour, :location
  has_one :user
end

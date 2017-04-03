class ZoneSerializer < ActiveModel::Serializer
  attributes :id, :name, :surface, :labour, :location, :location_geometry, :image
  has_one :project, serializer: ProjectSerializer
end

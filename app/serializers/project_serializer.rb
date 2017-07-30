class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :surface, :labour, :location, :location_geometry, :image, :num_of_zone
  has_one :user

  def num_of_zone
    object.zones.count
  end

  def id
    object.hash_id
  end
end

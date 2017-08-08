class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :surface, :labour, :location, :location_geometry, :image, :num_of_zone,
    :current_user_role
  has_one :user

  def num_of_zone
    object.zones.count
  end

  def id
    object.hash_id
  end

  def current_user_role
    if object.user == current_user
      :owner
    elsif current_user.has_role? :project_admin, object
      :admin
    elsif current_user.has_role? :project_user, object
      :user
    else
      :guest
    end
  end
end

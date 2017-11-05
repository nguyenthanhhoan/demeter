class UserProfileSerializer < ActiveModel::Serializer
  attributes :id, :email, :role, :full_name, :image, :username, :first_name, :last_name, :uuid

  has_one :has_project do
    object.count_project > 0
  end

  # In case user donot have any project
  # He still can belong to one zone
  has_one :assigned_zone do
    zone = object.assigned_zone
    if zone.present?
      {
        project_id: zone.project.hash_id,
        zone_id: zone.hash_id
      }
    end
  end
end

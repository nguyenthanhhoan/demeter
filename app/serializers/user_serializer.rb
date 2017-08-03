class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role

  has_one :has_project do
    object.count_project > 0
  end
end

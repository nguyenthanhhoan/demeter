class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_one :has_project do
    object.projects.count > 0
  end
end

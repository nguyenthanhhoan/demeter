class FamilyTopicSerializer < ActiveModel::Serializer
  attributes :id, :title, :picture
  has_many :posts
end

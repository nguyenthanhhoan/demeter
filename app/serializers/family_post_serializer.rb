class FamilyPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :picture, :likes, :like_count, :trending
  has_one :family_topic
end

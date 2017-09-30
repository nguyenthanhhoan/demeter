class FamilyPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :picture
  has_one :family_topic
end

class Family::Topic < ApplicationRecord
  has_many :posts, class_name: 'Family::Post', foreign_key: 'family_topic_id'
  mount_uploader :picture, ImageUploader
end

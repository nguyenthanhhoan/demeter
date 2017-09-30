class Family::Post < ApplicationRecord
  belongs_to :family_topic, optional: true, class_name: 'Family::Topic'
  mount_uploader :picture, ImageUploader
end

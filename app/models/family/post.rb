class Family::Post < ApplicationRecord
  belongs_to :family_topic, optional: true
  mount_uploader :picture, ImageUploader
end

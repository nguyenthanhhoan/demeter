class Project < ApplicationRecord
  belongs_to :user

  has_many :zones
  mount_uploader :image, ImageUploader
end

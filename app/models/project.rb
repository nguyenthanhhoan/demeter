class Project < ApplicationRecord
  resourcify
  belongs_to :user

  has_many :zones, dependent: :destroy
  mount_uploader :image, ImageUploader
end

class Zone < ApplicationRecord
  has_and_belongs_to_many :cameras
  belongs_to :project

  mount_uploader :image, ImageUploader
end

class Zone < ApplicationRecord
  has_many :cameras_zones
  has_many :cameras, :through => :cameras_zones
  belongs_to :project

  mount_uploader :image, ImageUploader
end

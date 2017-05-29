class Zone < ApplicationRecord

  has_and_belongs_to_many :device_fields

  has_many :cameras_zones
  has_many :cameras, :through => :cameras_zones
  has_many :summary_device_fields, -> { where link_type: :summary }, class_name: 'DeviceFieldsZone'
  belongs_to :project

  mount_uploader :image, ImageUploader
end

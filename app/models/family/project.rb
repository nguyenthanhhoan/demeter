class Family::Project < ApplicationRecord
  belongs_to :user
  mount_uploader :image, ImageUploader
  has_one :package, class_name: 'Family::Package', foreign_key: 'family_project_id'
  has_one :package_camera, class_name: 'Family::PackageCamera', foreign_key: 'family_project_id'
end

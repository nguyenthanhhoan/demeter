class Family::Project < ApplicationRecord
  attr_accessor :package_id
  validates :name, presence: true
  belongs_to :user
  mount_uploader :image, ImageUploader
  has_one :package, class_name: 'Family::Package', foreign_key: 'family_project_id', dependent: :nullify
  has_one :alert, class_name: 'Family::ProjectAlert', foreign_key: 'family_project_id', dependent: :nullify
  has_many :cameras, class_name: 'Family::Camera', foreign_key: 'family_project_id'
end

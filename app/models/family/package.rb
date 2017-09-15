class Family::Package < ApplicationRecord
  belongs_to :project, class_name: 'Family::Project'
  has_many :device, class_name: 'Family::Device', foreign_key: 'family_package_id'
end

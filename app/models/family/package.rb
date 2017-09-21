class Family::Package < ApplicationRecord
  has_many :device, class_name: 'Family::Device', foreign_key: 'family_package_id'

  # TODO: This binding cannot work
  belongs_to :project, class_name: 'Family::Project'
end

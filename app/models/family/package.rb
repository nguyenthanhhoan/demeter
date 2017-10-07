class Family::Package < ApplicationRecord
  validates :serial_name, presence: true
  validates_uniqueness_of :serial_name
  has_many :devices, class_name: 'Family::Device', foreign_key: 'family_package_id'
end

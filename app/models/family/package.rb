class Family::Package < ApplicationRecord
  has_many :devices, class_name: 'Family::Device', foreign_key: 'family_package_id'
end

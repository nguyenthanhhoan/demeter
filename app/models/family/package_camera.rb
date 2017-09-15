class Family::PackageCamera < ApplicationRecord
  belongs_to :project, class_name: 'Family::Project'
end

class Family::ProjectAlert < ApplicationRecord
  belongs_to :family_project, class_name: 'Family::Project', foreign_key: 'family_project_id'
end

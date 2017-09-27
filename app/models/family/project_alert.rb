class Family::ProjectAlert < ApplicationRecord
  belongs_to :project, class_name: 'Family::Project', foreign_key: 'family_project_id'
end

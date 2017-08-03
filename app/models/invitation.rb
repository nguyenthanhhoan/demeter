class Invitation < ApplicationRecord
  enum role: [ :project_admin, :project_user ]
end

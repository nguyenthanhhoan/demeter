class Invitation < ApplicationRecord
  enum role: [ :project_admin, :project_user, :zone_admin, :zone_user ]
end

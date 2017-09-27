class Family::Notification < ApplicationRecord
  enum noti_type: [ :alert ]
  belongs_to :user
end

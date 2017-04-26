class Device < ApplicationRecord
  belongs_to :created_by, class_name: "User"

  enum device_type: [ :gateway, :gprs_device ]
  enum api: [ :aws, :socket ]
end

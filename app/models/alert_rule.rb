class AlertRule < ApplicationRecord
  belongs_to :device_field
  belongs_to :zone
  has_many :alerts, dependent: :nullify
end

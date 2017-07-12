class DeviceValueHistorySerializer < ApplicationSerializer
  attributes :id, :value, :created_at

  def created_at
    time_to_s(object.created_at.in_time_zone('Asia/Ho_Chi_Minh'))
  end
end

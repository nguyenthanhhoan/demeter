class DeviceValueHistorySerializer < ActiveModel::Serializer
  attributes :id, :value, :created_at

  def created_at
    object.created_at.in_time_zone('Hanoi').to_s
  end
end

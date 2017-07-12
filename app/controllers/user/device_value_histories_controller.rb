class User::DeviceValueHistoriesController < AuthorizedController

  # Get lastest data in 24h
  def query_lastest
    gateway = params[:gateway]
    field_id = params[:field_id]
    device_field = DeviceField.joins(:device).find_by({ 
      'devices.name': gateway,
      field_id: field_id
    })

    render json: DeviceValueHistory.where(device_field: device_field).
      where('created_at > ?', Time.current.in_time_zone('Asia/Ho_Chi_Minh') - 24 * 60 * 60).order(id: :asc)
  end
end

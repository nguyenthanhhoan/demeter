class UpdateValueService

  def update_device_value(serial_name, field_id, value)
    return_hash = {
      result: :success,
      message: 'Update successfully!'
    }
    package = Family::Package.find_by_serial_name serial_name
    if package.present?
      device = package.devices.find { |device|
        device.field_id === field_id
      }
      if device.present?
        device.update_attribute(:value, value)
        FamilyDeviceEventService.new(device).trigger_event()
        FamilyAlertService.new.trigger_alert(device)
        render :json => { message: 'Update successfully!' }
      else
        Rails.logger.info 'Cannot find field_value!'
        return_hash = {
          result: :fail,
          message: 'Cannot find field_value!'
        }
      end
    else
      Rails.logger.info "Cannot find package for serial_name: #{serial_name}"
      return_hash = {
        result: :fail,
        message: "Cannot find package for serial_name: #{serial_name}"
      }
    end
    return_hash
  end
end
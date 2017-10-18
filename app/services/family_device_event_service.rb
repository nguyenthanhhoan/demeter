class FamilyDeviceEventService
  def initialize(device)
    @device = device
  end

  def trigger_event
    package = @device.package
    gateway = package.serial_name
    package.devices.each { |device|

      # Only trigger event for control device (read_write device)
      # And that event need to be configured in `event` mode
      if device.read_write? && device.event? && device.events.present?

        # Events object hold the configuration for event
        events = JSON.parse(device.events)
        event_config = events.find { |event|
          @device.uuid == event['sensor_id']
        }
        if event_config.present?
          if event_config['lower_limit'].present? && event_config['lower_limit'] > Float(@device.value)
            value = event_config['lower_limit_value'] === 1
            Rails.logger.info "Event matched! Prepare to update value of gateway: #{gateway}, field_id: #{device.field_id} to: #{value}"
            AwsIotService.new.update_thing_shadow_v2(gateway, device.field_id, value)
          end
          if event_config['upper_limit'].present? && event_config['upper_limit'] < Float(@device.value)
            value = event_config['upper_limit_value'] === 1
            Rails.logger.info "Event matched! Prepare to update value of gateway: #{gateway}, field_id: #{device.field_id} to: #{value}"
            AwsIotService.new.update_thing_shadow_v2(gateway, device.field_id, value)
          end
        end
      end
    }
  end
end
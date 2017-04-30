class AwsIotService

  def self.update_field(thing_name, field_name, field_value)
    client = Aws::IoT::Client.new(region: ENV.fetch('AWS_DYNAMODB_REGION'))
    client.update_thing({
      thing_name: thing_name,
      attribute_payload: {
        attributes: {
          field_name => field_value,
        },
        merge: true
      },
      remove_thing_type: false
    })
  end

  def self.create_thing(thing_name)
    client = Aws::IoT::Client.new(region: ENV.fetch('AWS_DYNAMODB_REGION'))
    client.create_thing({
      thing_name: thing_name,
      thing_type_name: thing_type
    })
  end

  def self.get_thing_shadow(thing_name)
    client = Aws::IoTDataPlane::Client.new({
      region: ENV.fetch('AWS_DYNAMODB_REGION'),
      endpoint: ENV.fetch('AWS_THING_SHADOW_REST_API')
    })
    thing = client.get_thing_shadow({
      thing_name: 'RGBLedLamp'
    })
    payload = thing.payload.to_json
    thing_state = JSON.parse(JSON.parse(payload)[0])
  end

  def self.update_thing_shadow(device_field)
    client = Aws::IoTDataPlane::Client.new({
      region: ENV.fetch('AWS_DYNAMODB_REGION'),
      endpoint: ENV.fetch('AWS_THING_SHADOW_REST_API')
    })

    if device_field.field_changed?
      device_state = {
        value: device_field.value,
        updateType: device_field.update_type
      }
    else
      device_state = {
        updateType: device_field.update_type,
        interval: device_field.interval
      }
    end
    
    submit_state = {
      state: {
        desired: {
          "#{device_field.field_id}": device_state
        }
      }
    }

    thing = client.update_thing_shadow({
      thing_name: device_field.device.name,
      payload: submit_state.to_json.to_s
    })
  end
end


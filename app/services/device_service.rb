class DeviceService
  
  # Example state
  # {
  #   "state": {
  #     "desired": {
  #       "field11": {
  #         "value":0
  #       },
  #     },
  #     "reported": {
  #       "field11":{
  #         "value":0,
  #         "updateRate":0
  #       },"field12":{"value":0,"updateRate":0},
  #       "field13":{"value":0,"updateRate":0},"field14":{"value":0,"updateRate":0},
  #       "field15":{"value":1,"updateRate":0},"field16":{"value":0,"updateRate":0},
  #       "field17":{"value":0,"updateRate":0},"field18":{"value":0,"updateRate":0},
  #       "field0":{"value":0,"updateRate":0},"field1":{"value":0,"updateRate":0},
  #       "field2":{"value":0,"updateRate":0},"field3":{"value":0,"updateRate":0},
  #       "field4":{"value":0,"updateRate":0},"field5":{"value":0,"updateRate":0},
  #       "field6":{"value":0,"updateRate":0},"field7":{"value":0,"updateRate":0},
  #       "field8":{"value":0,"updateRate":0},"field9":{"value":0,"updateRate":0},
  #       "field10":{"value":0,"updateRate":0}
  #     },
  #     "delta": {
  #       "field12": {
  #         "value":"0"
  #       }
  #     }
  #   }
  # }
  def sync_with_latest_state(devices, device_gateway)
    latest_state = AwsIotService.new.get_thing_shadow device_gateway
    Rails.logger.info "State=#{latest_state.to_json}"
    latest_state["state"]["reported"].each do |key, reported_field|
      field_id = key
      field_value = reported_field["value"]
      field = devices.select { |device|
        device.field_id == field_id && device.device.name == device_gateway
      }[0]
      
      if field.present?
        next unless is_match_data_type?(field, reported_field)
        case field.value_data_type
        when :integer
          if Integer(field.value) != field_value
            Rails.logger.info "[DeviceService][sync_with_latest_state] #{field_id} not synced [db=#{field.value}, [gateway=#{field_value}]]"
            field.update_attribute(:value, field_value.to_s)
            field.update_attribute(:value_in_int, field_value)
          end
        when :float
          if (field.value.to_f - field_value).abs >= 0.1
            Rails.logger.info "[DeviceService][sync_with_latest_state] #{field_id} not synced [db=#{field.value}, [gateway=#{field_value}]]"
            field.update_attribute(:value, field_value)
            field.update_attribute(:value_in_float, field_value)
          end
        else
          # String type
          if field.value != field_value
            Rails.logger.info "[DeviceService][sync_with_latest_state] #{field_id} not synced [db=#{field.value}, [gateway=#{field_value}]]"
            field.update_attribute(:value, field_value)
          end
        end
      end
    end
  end

  # Check correct data_type in db_field and gw_field
  def is_match_data_type?(db_field, gw_field)
    result = true
    gw_value = gw_field["value"]
    case db_field.value_data_type
    when :integer
      if gw_value.class != Fixnum
        result = false
      end
    when :float
      if gw_value.class != Float
        result = false
      end
    end
    unless result
      Rails.logger.warn "[DeviceService][sync_with_latest_state] Data type not match"
      Rails.logger.warn "db_field data type: #{db_field.value_data_type.to_s}."
      Rails.logger.warn "gw_field value: #{gw_value}."
    end
    result
  end

  #
  # Update latest field for value
  # Latest value can get from dynamodb (read_only field) or shadow state (read_write field)
  #
  def update_latest_value(db_field)
    device_gateway = db_field.device.name
    if db_field.read_only?
      latest_result = DynamodbService.new.get_lastest_data(device_gateway, db_field.field_id)
      if latest_result.empty?
        Rails.logger.warn "There is not updated value for #{db_field.field_id}"
      else
        db_field.update_attribute(:value_updated_at, Time.at(latest_result[:timestamp]))
        update_value(db_field, latest_result[:value])
      end
    end
  end

  #
  # Update value to db based on the value_data_type
  #
  def update_value(device_field, value)
    device_field.update_attribute(:value, value)
    if device_field.integer?
      device_field.update_attribute(:value_in_int, value.to_i)
    else device_field.float?
      device_field.update_attribute(:value_in_float, value.to_f)
    end
  end
end
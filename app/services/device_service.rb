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
    latest_state["state"]["report"].each do |key, report_field|
      field_id = key
      field_value = report_field["value"]
      field = devices.select { |device|
        device.field_id == field_id && device.device.name == device_gateway
      }[0]
      
      if field.present?
        next unless is_match_data_type?(field, report_field)
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
      Rails.logger.warn "db_field data type: #{db_fied.value_data_type.to_s}."
      Rails.logger.warn "gw_field value: #{gw_value}."
    end
    result
  end
end
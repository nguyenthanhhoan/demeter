class DynamodbService

  def get_client
    Aws::DynamoDB::Client.new(region: ENV.fetch('AWS_DYNAMODB_REGION'))
  end

  def get_data_in(start_timestamp, end_timestamp, device_gateway)
    client = get_client
    items = []
    query_obj = {
      key_conditions: {
        'deviceId' => {
          comparison_operator: 'EQ',
          attribute_value_list: [device_gateway]
        },
        'timestamp' => {
          comparison_operator: 'BETWEEN',

          # Debug purpose
          # Date.current.beginning_of_day.to_f * 1000
          # Date.current.beginning_of_day.to_f * 1000 + 10 * 60 * 1000
          # attribute_value_list: [1497225600000, 1497226200000]
          attribute_value_list: [start_timestamp.to_i, end_timestamp.to_i]
        }
      },
      table_name: 'gateway_data'
    }

    query_result = client.query(query_obj)
    items = query_result[:items]

    while query_result.last_evaluated_key.present?
      query_obj[:exclusive_start_key] = query_result.last_evaluated_key
      query_result = client.query(query_obj)
      items += query_result[:items]
    end
    items
  end

  # Incase have more than max_point data points, we should normalize into max_point points only
  def normalize_data(points, max_point)
    if points.length > max_point
      start_time = Integer(points[0]['timestamp'].to_f)
      end_time = Integer(points[points.count - 1]['timestamp'].to_f)

      result_points = []
      duration = end_time - start_time
      time_step = duration / max_point

      max_point.times { |i| 
        result_point = points.bsearch { |x| 
          Integer(x['timestamp'].to_f) >= start_time + time_step * i
        }
        unless result_point.blank?
          result_points << result_point
        end
      }
      result_points.to_json
    else
      points.to_json
    end
  end

  #
  # Query last 1 hour data and get the latest
  #
  def get_lastest_data(device_gateway, field_id)
    client = get_client
    items = []
    result = {}
    query_obj = {
      key_conditions: {
        'deviceId' => {
          comparison_operator: 'EQ',
          attribute_value_list: ['dmt-client']
        },
        'timestamp' => {
          comparison_operator: 'BETWEEN',
          attribute_value_list: [
            Time.now.to_i * 1000 - 60 * 60 * 1000,
            Time.now.to_i * 1000
          ]
        }
      },
      table_name: 'gateway_data'
    }

    query_result = client.query(query_obj)
    items = query_result[:items]
    unless items.empty?
      latest_item = items[items.length - 1]
      result[:timestamp] = latest_item["timestamp"].to_i / 1000
      result[:value] = latest_item["payload"]["data"][field_id]
    end
    result
  end
end

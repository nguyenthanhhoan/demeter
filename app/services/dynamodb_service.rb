class DynamodbService

  def self.get_data_in(start_timestamp, end_timestamp, device_gateway)
    client = Aws::DynamoDB::Client.new(region: ENV.fetch('AWS_DYNAMODB_REGION'))

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
  def self.normalize_data(points, max_point)
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

  # TODO
  def get_lastest_data(device_gateway)
    start_timestamp = Date.current.to_f * 1000
    end_timestamp = start_time - 60 * 1000

    # Query data within last minute
    points = DynamodbService.get_data_in(start_timestamp, end_timestamp, device_gateway)

    if points.count > 0
      points[points.count - 1].payload.data
    else
      Rails.logger.info "Within last minute. There is no data update from #{device_gateway} gateway"
    end
  end
end

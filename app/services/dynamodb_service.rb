class DynamodbService

  def self.get_data_in(start_timestamp, end_timestamp)
    client = Aws::DynamoDB::Client.new(region: ENV.fetch('AWS_DYNAMODB_REGION'))

    query_result = client.query({
      key_conditions: {
        'deviceId' => {
          comparison_operator: 'EQ',
          attribute_value_list: ['cdf-gateway-123']
        },
        'timestamp' => {
          comparison_operator: 'BETWEEN',
          #Example
          #attribute_value_list: ['1492298805911', '1492298856230']
          attribute_value_list: [start_timestamp, end_timestamp]
        }
      },
      table_name: "cdf-gateway-data"
    })
    query_result[:items]
  end

  # Incase have more than max_point data points, we should normalize into max_point points only
  def self.normalize_data(start_timestamp, end_timestamp, points, max_point)
    if points.length > max_point
      start_time = Integer(start_timestamp)
      end_time = Integer(end_timestamp)

      result_points = []
      duration = end_time - start_time
      time_step = duration / max_point
      max_point.times { |i| 
        result_point = points.bsearch { |x| 
          Integer(x['timestamp']) >= start_time + time_step * i
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
end

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
    query_result[:items].to_json
  end
end

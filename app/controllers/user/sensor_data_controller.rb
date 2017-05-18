class User::SensorDataController < AuthorizedController

  def query_in_timestamp
    start_timestamp = params[:start_timestamp].to_i
    end_timestamp = params[:end_timestamp].to_i
    # sensor_data = CacheService.get_cached_data_in(start_timestamp, end_timestamp)
    # unless sensor_data.present?
      sensor_data = DynamodbService.get_data_in(start_timestamp, end_timestamp)
    # end

    sensor_data_normalized = DynamodbService.normalize_data(start_timestamp, end_timestamp, sensor_data, 300)
    render json: sensor_data_normalized
  end

end

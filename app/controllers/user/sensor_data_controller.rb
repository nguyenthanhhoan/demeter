class User::SensorDataController < AuthorizedController

  def query_in_timestamp
    start_timestamp = params[:start_timestamp].to_i
    end_timestamp = params[:end_timestamp].to_i
    zone = Zone.find params[:zone_id].to_i
    # sensor_data = CacheService.get_cached_data_in(start_timestamp, end_timestamp)
    # unless sensor_data.present?
      sensor_data = DynamodbService.get_data_in(start_timestamp, end_timestamp, zone.device_gateway)
    # end

    sensor_data_normalized = DynamodbService.normalize_data(start_timestamp, end_timestamp, sensor_data, 300)
    render json: sensor_data_normalized
  end

  def query_in_date
    zone = Zone.find params[:zone_id].to_i
    date = params[:date]
    gateway_name = zone.device_gateway

    redis = CacheService.get_redis
    cached_key = CacheService.build_key(gateway_name, date)

    # Get data from cache
    sensor_data = redis.get(cached_key)

    if sensor_data.present? 
      render json: JSON.parse(sensor_data)
    else

      # Cached data not present. Should create cache data first
      sensor_data_parsed = CacheService.build_cache_data_by_date(gateway_name, date)
      render json: sensor_data_parsed
    end
  end
end

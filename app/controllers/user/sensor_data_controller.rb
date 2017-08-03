class User::SensorDataController < AuthorizedController
  before_action :get_zone

  def query_in_timestamp
    start_timestamp = params[:start_timestamp].to_i
    end_timestamp = params[:end_timestamp].to_i
    # sensor_data = CacheService.get_cached_data_in(start_timestamp, end_timestamp)
    # unless sensor_data.present?
      sensor_data = DynamodbService.get_data_in(start_timestamp, end_timestamp, @zone.device_gateway)
    # end

    sensor_data_normalized = DynamodbService.normalize_data(sensor_data, 300)
    render json: sensor_data_normalized
  end

  def query_in_date
    date = params[:date]
    gateway_name = @zone.device_gateway

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


  def query_lastest
    gateway_name = @zone.device_gateway

    redis = CacheService.get_redis
    cached_key = CacheService.build_key_lastest(gateway_name)

    # Get data from cache
    sensor_data = redis.get(cached_key)
    sensor_data_parsed = []

    if sensor_data.present? 
      sensor_data_parsed = JSON.parse(sensor_data)
    else
      logger.info "Latest data not present in cache for gateway: #{gateway_name}. Prepare to build cache"
      sensor_data_parsed = CacheService.build_cache_data_lastest(gateway_name)
    end

    sensor_data_parsed = DynamodbService.normalize_data(sensor_data_parsed, 300)
    render json: sensor_data_parsed
  end

  private
    def get_zone
      hash_id = params[:zone_id]
      id = HashIdService.new.decode(hash_id)
      @zone = Zone.find(id)
    end
end

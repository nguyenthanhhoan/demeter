class Family::SensorDataController < AuthorizedController
  before_action :get_package_id

  def query_in_timestamp
    start_timestamp = params[:start_timestamp].to_i
    end_timestamp = params[:end_timestamp].to_i
    # sensor_data = CacheService.get_cached_data_in(start_timestamp, end_timestamp)
    # unless sensor_data.present?
      sensor_data = DynamodbService.new.get_data_in(start_timestamp, end_timestamp, params[:package_id])
    # end

    sensor_data_normalized = DynamodbService.new.normalize_data(sensor_data, 300)
    render json: sensor_data_normalized
  end

  def query_in_date
    date = params[:date]
    gateway_name = params[:package_id]

    redis = CacheService.new.get_redis
    cached_key = CacheService.new.build_key(gateway_name, date)

    # Get data from cache
    sensor_data = redis.get(cached_key)

    if sensor_data.present? 
      render json: JSON.parse(sensor_data)
    else

      # Cached data not present. Should create cache data first
      sensor_data_parsed = CacheService.new.build_cache_data_by_date(gateway_name, date)
      render json: sensor_data_parsed
    end
  end


  def query_lastest
    gateway_name = params[:package_id]
    lastest_data = CacheService.new.query_lastest(gateway_name)
    render json: lastest_data
  end

  private

    def get_package_id
      package = Family::Package.find_by_serial_name params[:package_id]
      @package_id = package.id
    end
end

class CacheService

  def self.get_redis
    Redis.new(:host => "redis", :port => 6379)
  end

  def self.build_key(gateway_name, date)
    "gateway:#{gateway_name}:#{date}"
  end

  def self.build_cache_data_by_date(gateway_name, date_s)
    cached_key = CacheService.build_key(gateway_name, date_s)
    redis = CacheService.get_redis

    date = Date.parse(date_s).in_time_zone('Hanoi')

    start_timestamp = date.beginning_of_day.to_f * 1000
    end_timestamp = date.end_of_day.to_f * 1000

    sensor_data = DynamodbService.get_data_in(start_timestamp, end_timestamp, gateway_name)
    sensor_data_normalized = DynamodbService.normalize_data(start_timestamp, end_timestamp, sensor_data, 300)
    redis.set(cached_key, sensor_data_normalized)
    sensor_data_normalized
  end
end

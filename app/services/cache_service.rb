class CacheService

  def self.get_redis
    Redis.new(:host => "redis", :port => 6379)
  end

  def self.build_key(gateway_name, date)
    "gateway:#{gateway_name}:#{date}"
  end

  def self.build_key_lastest(gateway_name)
    "gateway:#{gateway_name}:latest"
  end

  def self.build_cache_data_by_date(gateway_name, date_s)
    cached_key = CacheService.build_key(gateway_name, date_s)
    redis = CacheService.get_redis

    date = Date.parse(date_s).in_time_zone('Hanoi')

    start_timestamp = date.beginning_of_day.to_f * 1000
    end_timestamp = date.end_of_day.to_f * 1000

    sensor_data = DynamodbService.get_data_in(start_timestamp, end_timestamp, gateway_name)
    sensor_data_normalized = DynamodbService.normalize_data(sensor_data, 300)
    redis.set(cached_key, sensor_data_normalized)
    sensor_data_normalized
  end

  def self.build_cache_data_lastest(gateway_name)
    cached_key = CacheService.build_key_lastest(gateway_name)
    redis = CacheService.get_redis

    cached_data_str = redis.get(cached_key)
    cached_data = []

    # Timestamp to clear old data
    old_timestamp = Time.new.ago(24 * 3600).to_f * 1000

    start_timestamp = old_timestamp
    end_timestamp = Time.new.to_f * 1000

    if cached_data_str.present?
      cached_data = JSON.parse(cached_data_str)
      cached_length = cached_data.length
      if cached_length > 0
        start_timestamp = Integer(cached_data[cached_length - 1]['timestamp'].to_f)
      end
    end

    sensor_data = DynamodbService.get_data_in(start_timestamp, end_timestamp, gateway_name)
    cached_data += sensor_data

    # Clear old data
    cached_data = cached_data.select { |item|
      Integer(item['timestamp'].to_f) > old_timestamp
    }

    redis.set(cached_key, cached_data.to_json)
    cached_data
  end
end

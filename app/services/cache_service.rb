class CacheService

  def self.get_cached_data_in(start_timestamp, end_timestamp)
    redis = Redis.new(:host => "redis", :port => 6379)

    start_date = DateTime.strptime(start_timestamp.to_s, '%Q').to_date
    end_date = DateTime.strptime(end_timestamp.to_s, '%Q').to_date

    date_formatted = start_date.to_s('%Y-%m-%d')

    if start_date != end_date
      return false
    end

    cached_data = redis.get(date_formatted)
    if cached_data.present?
      Rails.logger.info 'go to cached_data.present?'
      
      cached_data_parsed = JSON.parse(cached_data)
      Rails.logger.info cached_data_parsed.count

      results = cached_data_parsed.select { |x|
        x['timestamp'].to_i >= start_timestamp && Integer(x['timestamp']) <= end_timestamp
      }
      results
    else
      false
    end
  end
end

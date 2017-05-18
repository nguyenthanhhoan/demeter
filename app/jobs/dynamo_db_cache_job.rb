class DynamoDbCacheJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Rails.logger.info 'Execute dynamodb cache job'

    redis = Redis.new(:host => "redis", :port => 6379)
    today = Time.new.beginning_of_day.to_date.to_s('%Y-%m-%d')

    cached_data = redis.get(today)

    if cached_data.present?
      cached_data_parsed = JSON.parse(cached_data)

      cached_length = cached_data_parsed.count
      Rails.logger.info "Cached data length #{cached_length}"

      # Get data since the last call
      start_timestamp = Integer(cached_data_parsed[cached_length - 1]['timestamp'])
      end_timestamp = Time.new.to_f * 1000
      result_data = DynamodbService.get_data_in(start_timestamp, end_timestamp)
      cached_data_parsed += result_data
      redis.set(today, cached_data_parsed.to_json)
    else
      Rails.logger.info 'Prepare get all data for one day'
      # Get data for all day
      start_timestamp = Time.new.beginning_of_day.to_f * 1000
      end_timestamp = Time.new.to_f * 1000
      result_data = DynamodbService.get_data_in(start_timestamp, end_timestamp)
      redis.set(today, result_data.to_json)
    end
  end
end

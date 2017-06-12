class DynamoDbCacheJob < ApplicationJob
  queue_as :default

  def perform(*args)
    Rails.logger.info 'Execute dynamodb cache job'

    redis = CacheService.get_redis
    today = Time.current.in_time_zone('Hanoi').beginning_of_day.to_date.to_s('%Y-%m-%d')

    gateway_name = 'cdf-gateway'
    CacheService.build_cache_data_by_date(gateway_name, today)
  end
end

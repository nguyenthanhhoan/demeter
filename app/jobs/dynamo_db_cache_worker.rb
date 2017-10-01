class DynamoDbCacheWorker
  include Sidekiq::Worker

  def perform()
    Rails.logger.info 'Execute dynamodb cache job'

    today = Time.current.in_time_zone('Asia/Ho_Chi_Minh').beginning_of_day.to_date.to_s('%Y-%m-%d')

    gateway_name = 'cdf-gateway'
    CacheService.new.build_cache_data_by_date(gateway_name, today)

    gateway_name = 'wifami-001'
    CacheService.new.build_cache_data_by_date(gateway_name, today)

    gateway_name = 'wifami-002'
    CacheService.new.build_cache_data_by_date(gateway_name, today)
  end
end

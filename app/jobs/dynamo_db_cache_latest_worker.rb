class DynamoDbCacheLatestWorker
  include Sidekiq::Worker

  def perform()
    gateway_name = 'cdf-gateway'
    CacheService.build_cache_data_lastest(gateway_name)
  end
end

class DynamoDbCacheLatestWorker
  include Sidekiq::Worker

  def perform()
    Rails.logger.info 'Execute DynamoDbCacheLatestWorker'

    gateway_name = 'cdf-gateway'
    CacheService.new.build_cache_data_lastest(gateway_name)

    gateway_name = 'dmt-client'
    CacheService.new.build_cache_data_lastest(gateway_name)

    gateway_name = 'wifami-001'
    CacheService.new.build_cache_data_lastest(gateway_name)

    gateway_name = 'wifami-002'
    CacheService.new.build_cache_data_lastest(gateway_name)
  end
end

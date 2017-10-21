class DynamoDbCacheLatestWorker
  include Sidekiq::Worker

  def perform()
    Rails.logger.info 'Execute DynamoDbCacheLatestWorker'

    gateway_name = 'cdf-gateway'
    CacheService.new.build_cache_data_lastest(gateway_name)

    gateway_name = 'dmt-client'
    CacheService.new.build_cache_data_lastest(gateway_name)

    Family::Package.all.each { | package |
      Rails.logger.info "Execute DynamoDbCacheLatestWorker for #{package.serial_name}"
      CacheService.new.build_cache_data_lastest(package.serial_name)
    }
  end
end

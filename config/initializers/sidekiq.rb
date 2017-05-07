require 'sidekiq/api'

redis_url = ENV['REDIS_1_PORT_6379_TCP_ADDR'] ? "redis://" + ENV['REDIS_1_PORT_6379_TCP_ADDR'] + ":6379" : "redis://redis:6379"

redis_config = { url: redis_url, namespace: 'sidekiq' }

Sidekiq.configure_server do |config|
  config.redis = redis_config
end

Sidekiq.configure_client do |config|
  config.redis = redis_config
end

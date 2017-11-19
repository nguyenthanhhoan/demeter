class GatewayService
  def get_redis
    Redis.new(:host => "redis", :port => 6379)
  end

  def cached_key
    'gateways'
  end

  def add_gateway(gateway_name)
    redis = get_redis
    gateway_list_str = redis.get(cached_key)
    if gateway_list_str.present?
      gateways = JSON.parse(gateway_list_str)
      gateways << gateway_name
      redis.set(cached_key, gateways.to_json)
    else 
      Rails.logger.info "Gateway cache is empty, need init gateway"
      init_gateway()
    end
  end

  def init_gateway
    redis = get_redis

    # Init gateways list with corporate project
    gateways = ['cdf-gateway', 'dmt-client']
    gateways = Family::Package.all.map { |package|
      gateways << package.serial_name
    }
    redis.set(cached_key, gateways.to_json)
  end
end
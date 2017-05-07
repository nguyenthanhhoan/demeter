class WUndergroundService
  def self.request_weather_service_type(location, service_type)
    require 'rest-client'
    url = "http://api.wunderground.com/api/00d0f6e2f45ef13d/#{service_type}/q/#{location}.json"
    response = RestClient.get url

    wundergroundCache = WUndergroundCache.find_by location: location , service_type: service_type
    if wundergroundCache
      wundergroundCache.content = response.body
      wundergroundCache.save
    else
      wundergroundCache = WUndergroundCache.create({
        location: location,
        content: response.body,
        service_type: service_type
      })
    end
    wundergroundCache
  end

  def self.request_weather_data(location)
    if location.present?
      WUndergroundService.request_weather_service_type(location, 'forecast10day')
      WUndergroundService.request_weather_service_type(location, 'conditions')
      WUndergroundService.request_weather_service_type(location, 'hourly10day')
    end
  end
end

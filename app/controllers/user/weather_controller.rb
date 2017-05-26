class User::WeatherController < AuthorizedController

  def query
    location = params[:location]
    service_type = params[:service_type]
    weather_data = WUndergroundCache.find_by location: location , service_type: service_type
    if weather_data.blank? || weather_data.updated_at < Time.now - 1.hour
      weather_data = WUndergroundService.request_weather_service_type(location, service_type)
    end
    render json: JSON.parse(weather_data.content)
  end

end

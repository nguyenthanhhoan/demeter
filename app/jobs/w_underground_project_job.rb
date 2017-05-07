class WUndergroundProjectJob < ApplicationJob
  queue_as :default

  def perform(project)
    WUndergroundService.request_weather_data project.location_geometry
  end
end

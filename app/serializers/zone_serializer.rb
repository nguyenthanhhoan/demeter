class ZoneSerializer < ActiveModel::Serializer
  attributes :id, :zone_id, :name, :start_date, :end_date,
    :plant, :plant_variety, :plant_quantity, :plant_quantity_unit,
    :production_type, :estimate_yield, :estimate_yield_unit, :surface, :surface_unit,
    :zone_type, :growing_condition_type, :ownership_type, :labour, :location, :location_geometry, :image,
    :setting


  has_one :project, serializer: ProjectSerializer

  def start_date
    object.start_date.to_s
  end

  def end_date
    object.end_date.to_s
  end

  def setting
    unless object.setting.nil?
      JSON.parse(object.setting)
    else
      {
        showWeatherForecast: true,
        showEnvironmentInformation: true,
        showRecentNotification: true,
        showUpcomingTask: true,
        showCamera: true
      }
    end
  end
end

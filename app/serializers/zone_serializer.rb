class ZoneSerializer < ApplicationSerializer
  attributes :id, :zone_id, :name, :start_date, :end_date,
    :plant, :plant_variety, :plant_quantity, :plant_quantity_unit,
    :production_type, :estimate_yield, :estimate_yield_unit, :surface, :surface_unit,
    :zone_type, :growing_condition_type, :ownership_type, :labour, :location, :location_geometry, :image,
    :device_gateway, :setting, :data_device_fields, :current_user_role


  has_one :project, serializer: ProjectSerializer

  has_many :cameras_zones
  has_many :cameras

  def start_date
    date_to_s(object.start_date)
  end

  def end_date
    date_to_s(object.end_date)
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

  def data_device_fields
    object.data_device_fields.order(:order).map { |device_field|
      device_field.device_field
    }
  end

  def id
    object.hash_id
  end

  def current_user_role
    if object.user == current_user
      :owner
    elsif current_user.has_role? :zone_admin, object
      :admin
    elsif current_user.has_role? :zone_user, object
      :user
    else
      :guest
    end
  end
end

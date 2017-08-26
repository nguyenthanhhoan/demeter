class AdminZoneSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date,
    :plant, :plant_variety, :plant_quantity, :plant_quantity_unit,
    :production_type, :estimate_yield, :estimate_yield_unit, :surface, :surface_unit,
    :zone_type, :growing_condition_type, :ownership_type, :labour, :location, :location_geometry, :image,
    :device_gateway, :setting

  has_one :project, serializer: ProjectSerializer
end

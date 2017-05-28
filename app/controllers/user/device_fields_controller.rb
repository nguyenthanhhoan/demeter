class User::DeviceFieldsController < AuthorizedController

  def index
    render json: DeviceField.all.order(id: :desc)
  end

  def list_device_updatable
    render json: DeviceField.where(field_attribute: :read_write).order(id: :desc)
  end

  def list_device_assigned
    device_fields_zones = DeviceFieldsZone.where({
      zone_id: params[:zone_id],
      link_type: params[:link_type]
    })

    device_assigned = device_fields_zones.map { | device_fields_zone |
      device_fields_zone.device_field
    }
    render json: device_assigned
  end

  def assign_device_to_zone
    device_field = DeviceField.find params[:device_field_id]
    assigned_device = DeviceFieldsZone.create({
      device_field_id: params[:device_field_id],
      zone_id: params[:zone_id],
      link_type: params[:link_type]
    })
    render json: assigned_device
  end

  def unassign_device_to_zone
    assigned_device = DeviceFieldsZone.find_by({
      device_field_id: params[:device_field_id],
      zone_id: params[:zone_id],
      link_type: params[:link_type]
    })
    assigned_device.destroy
    render json: assigned_device
  end

  def update_device_value
    device_field = DeviceField.find params[:device_field_id]
    device_field.value = params[:value]
    AwsIotService.update_thing_shadow(device_field)

    # TODO: Should update this attribute in the subcribe topic from AWS IOT
    device_field.update_attribute(:value, params[:value])
    render json: device_field
  end

end

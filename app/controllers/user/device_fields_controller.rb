class User::DeviceFieldsController < AuthorizedController
  before_action :get_zone_id, only: [:list_device_assigned, 
    :assign_device_to_zone, :unassign_device_to_zone]

  def index
    render json: DeviceField.all.order(id: :desc)
  end

  def list_device_updatable
    render json: DeviceField.where(field_attribute: :read_write).order(id: :desc)
  end

  def list_device_assigned

    where_query = {
      zone_id: @zone_id
    }

    if params[:link_type].present?
      where_query[:link_type] = params[:link_type]
    end

    device_fields_zones = DeviceFieldsZone.where(where_query)

    device_assigned = device_fields_zones.map { | device_fields_zone |
      device_fields_zone.device_field
    }
    render json: device_assigned
  end

  def assign_device_to_zone
    device_field_id = params[:device_field_id]
    link_type = params[:link_type]
    device_field = DeviceField.find device_field_id

    count = DeviceFieldsZone.where({
      zone_id: @zone_id,
      link_type: link_type
    }).count
    assigned_device = DeviceFieldsZone.create({
      device_field_id: device_field_id,
      zone_id: @zone_id,
      link_type: link_type,
      order: count
    })
    render json: assigned_device
  end

  def unassign_device_to_zone
    assigned_device = DeviceFieldsZone.find_by({
      device_field_id: params[:device_field_id],
      zone_id: @zone_id,
      link_type: params[:link_type]
    })
    assigned_device.destroy
    render json: assigned_device
  end

  def update_device_value
    device_field = DeviceField.find params[:device_field_id]
    device_field.value = params[:value]
    AwsIotService.update_thing_shadow(device_field)
    render json: device_field
  end

  def update_order
    device_fields = params[:device_fields]

    device_fields.each { |device_field|

      DeviceFieldsZone.where({
        device_field_id: device_field[:device_field_id],
        zone_id: device_field[:zone_id],
        link_type: device_field[:link_type]
      }).update(order: device_field[:order])
    }

    render json: {
      message: t(:order_successfully)
    }
  end

  def get_zone_id
    hash_id = params[:zone_id]
    @zone_id = HashIdService.new.decode(hash_id)
  end

end

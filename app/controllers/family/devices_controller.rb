class Family::DevicesController < AuthorizedController
  before_action :get_package_id, only: [:list_device_assigned, :update_device_value]

  def list_device_assigned
    where_query = {
      family_package_id: @package_id
    }
    if params[:field_attribute].present?
      where_query[:field_attribute] = :read_only
    end
    devices = Family::Device.where(where_query)
    render json: devices, each_serializer: FamilyDeviceSerializer
  end

  def update_device_value
    device_field = DeviceField.find params[:device_field_id]
    device_field.value = params[:value]
    AwsIotService.update_thing_shadow(device_field)
    render json: device_field
  end

  def get_package_id
    hash_id = params[:package_id]
    @package_id = HashIdService.new.decode_package(hash_id)
  end

end

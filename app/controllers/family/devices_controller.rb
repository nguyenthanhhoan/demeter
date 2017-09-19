class Family::DevicesController < AuthorizedController
  before_action :get_package_id, only: [:list_device_assigned, :update_device_value]
  before_action :get_device, only: [:update]

  def list_device_assigned
    where_query = {
      family_package_id: @package_id
    }
    if params[:field_attribute].present?
      where_query[:field_attribute] = params[:field_attribute]
    end
    devices = Family::Device.where(where_query).order(id: :asc)
    render json: devices, each_serializer: FamilyDeviceSerializer
  end

  def update
    if @device.update(device_params)
      render json: @device, serializer: FamilyDeviceSerializer
    else
      render :json => { errors: @device.errors }, :status => :bad_request
    end
  end

  def update_device_value
    device_field = DeviceField.find params[:device_field_id]
    device_field.value = params[:value]
    AwsIotService.update_thing_shadow(device_field)
    render json: device_field
  end

  private

    def get_package_id
      hash_id = params[:package_id]
      @package_id = HashIdService.new.decode_package(hash_id)
    end

    def device_params
      params.require(:device).permit(:name, :mode, :timer_start_date, :timer_end_date, :timer_daily_schedule, :events)
    end

    def get_device
      @device = Family::Device.find_by_uuid(params[:id])
    end

end

class Family::DevicesController < AuthorizedController
  before_action :get_package, only: [:list_device_assigned]
  before_action :get_device, only: [:update, :update_device_value]

  def list_device_assigned
    where_query = {
      family_package_id: @package.id
    }
    if params[:field_attribute].present?
      where_query[:field_attribute] = params[:field_attribute]
    end
    devices = Family::Device.where(where_query).order(id: :asc)

    device_gateway = @package.hash_id

    # TODO: Optimize this function
    # By quering only outdate field value
    DeviceService.new.sync_with_latest_state(devices, device_gateway)
    render json: devices, each_serializer: FamilyDeviceSerializer
  end

  def update
    if @device.update(device_params)
      # update_job()
      render json: @device, serializer: FamilyDeviceSerializer
    else
      render :json => { errors: @device.errors }, :status => :bad_request
    end
  end

  def update_device_value
    desired_value = params[:value]
    gateway = @device.package.hash_id
    AwsIotService.update_thing_shadow_v2(gateway, @device, desired_value)
    render json: @device, serializer: FamilyDeviceSerializer
  end

  private

    def update_job
      # FamilyDeviceTimerService.new(@device).remove_jobs()
      # FamilyDeviceEventService.new.remove_jobs(@device)
      # if @device.timer?
      #   FamilyDeviceTimerService.new(@device).update_job()
      # end
      # if @device.event?
      #   FamilyDeviceEventService.new.update_job(@device)
      # end
    end

    def get_package
      @package = Family::Package.find_by_hash_id params[:package_id]
    end

    def device_params
      params.require(:device).permit(:name, :mode, :timer_start_date, :timer_end_date, :timer_daily_schedule, :events)
    end

    def get_device
      @device = Family::Device.find_by_uuid(params[:id])
    end

end

class Admin::FamilyDevicesController < Admin::AdminController
  before_action :get_device, only: [:show, :edit, :update, :destroy]

  def index
    render json: Family::Device.where({ package: params[:package_id] }).order(id: :desc), each_serializer: FamilyDeviceSerializer
  end

  def show
    render json: @device, serializer: FamilyDeviceSerializer
  end

  def edit
    render json: @device, serializer: FamilyDeviceSerializer
  end

  def create
    @device = Family::Device.new(device_params)
    gateway = @device.device.name

    if @device.save
      AwsIotService.update_thing_shadow(gateway, @device)
      render json: @device, serializer: FamilyDeviceSerializer
    else
      render :json => { errors: @device.errors }, :status => :bad_request
    end
  end

  def update
    if @device.update(device_params)
      render json: @device, serializer: FamilyDeviceSerializer
    else
      render :json => { errors: @device.errors }, :status => :bad_request
    end
  end

  def destroy
    @device.destroy
    render json: @device, serializer: FamilyDeviceSerializer
  end

  private

    def device_params
      params.require(:device).permit(:field_id, :name, :name_display,
        :value, :value_data_type, :field_attribute)
    end

    def get_device
      @device = Family::Device.find_by_uuid(params[:id])
    end
end

class Admin::DevicesController < Admin::AdminController
  before_action :get_device, only: [:show, :edit, :update, :destroy]

  def index
    render json: Device.order(id: :desc)
  end

  def show
    render json: @device
  end

  def edit
    render json: @device
  end

  def create
    @device = Device.new(device_params)
    @device.created_by = current_user

    if @device.save
      render json: @device
    else
      render :json => { errors: @device.errors }, :status => :bad_request
    end
  end

  def update
    if @device.update(device_params)
      render json: @device
    else
      render :json => { errors: @device.errors }, :status => :bad_request
    end
  end

  def destroy
    @device.destroy
    render json: @device
  end

  private

    def device_params
      params.require(:device).permit(:name, :device_type, :api)
    end

    def get_device
      @device = Device.find(params[:id])
    end
end

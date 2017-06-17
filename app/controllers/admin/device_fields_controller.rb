class Admin::DeviceFieldsController < Admin::AdminController
  before_action :get_device_field, only: [:show, :edit, :update, :destroy]

  def index
    render json: DeviceField.where({ device: params[:device_id] }).order(id: :desc)
  end

  def show
    render json: @device_field
  end

  def edit
    render json: @device_field
  end

  def create
    @device_field = DeviceField.new(device_field_params)

    if @device_field.save
      AwsIotService.update_thing_shadow(@device_field)
      render json: @device_field
    else
      render :json => { errors: @device_field.errors }, :status => :bad_request
    end
  end

  def update
    if @device_field.update(device_field_params)
      AwsIotService.update_thing_shadow(@device_field)
      render json: @device_field
    else
      render :json => { errors: @device_field.errors }, :status => :bad_request
    end
  end

  def destroy
    @device_field.destroy
    render json: @device_field
  end

  private

    def device_field_params
      params.require(:device_field).permit(:device_id, :field_id, :name, :name_display, :description,
        :value, :value_data_type, :interval, :field_attribute, :update_rate,
        :chart_value_suffix, :chart_value_diff)
    end

    def get_device_field
      @device_field = DeviceField.find(params[:id])
    end
end

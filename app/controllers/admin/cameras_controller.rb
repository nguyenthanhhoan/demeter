class Admin::CamerasController < Admin::AdminController
  before_action :get_camera, only: [:show, :edit, :update, :destroy]

  def index
    render json: Camera.order(id: :desc)
  end

  def show
    render json: @camera
  end

  def edit
    render json: @camera
  end

  def create
    @camera = Camera.new(camera_params)

    if @camera.save
      render json: @camera
    else
      render :json => { errors: @camera.errors }, :status => :bad_request
    end
  end

  def update
    if @camera.update(camera_params)
      render json: @camera
    else
      render :json => { errors: @camera.errors }, :status => :bad_request
    end
  end

  def destroy
    @camera.destroy
    render json: @camera
  end

  private

    def camera_params
      params.require(:camera).permit(:name)
    end

    def get_camera
      @camera = Camera.find(params[:id])
    end
end

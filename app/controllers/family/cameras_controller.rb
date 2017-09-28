class Family::CamerasController < AuthorizedController
  before_action :get_camera, only: [:show, :update, :destroy]

  def index
    project = Family::Project.find params[:project_id]
    render json: project.cameras.order(id: :desc), each_serializer: FamilyCameraSerializer
  end

  def create
    @camera = Family::Camera.new(camera_params)
    if @camera.save
      render json: @camera, serializer: FamilyCameraSerializer
    else
      render :json => { errors: @camera.errors }, :status => :bad_request
    end
  end

  def update
    if @camera.update(camera_params)
      render json: @camera, serializer: FamilyCameraSerializer
    else
      render :json => { errors: @camera.errors }, :status => :bad_request
    end
  end

  def destroy
    @camera.destroy
    render json: @camera, serializer: FamilyCameraSerializer
  end

  private

    def camera_params
      params.require(:camera).permit(:name, :hash_id, :rtsp_url, :main, :family_project_id)
    end

    def get_camera
      @camera = Family::Camera.find(params[:id])
    end
end

class Admin::ProjectsController < Admin::AdminController
  before_action :get_project, only: [:show, :edit, :update, :destroy]

  def index
    render json: Project.order(id: :desc), each_serializer: AdminProjectSerializer
  end

  def show
    render json: @project, serializer: AdminProjectSerializer
  end

  def edit
    render json: @project, serializer: AdminProjectSerializer
  end

  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, serializer: AdminProjectSerializer
    else
      render :json => { errors: @project.errors }, :status => :bad_request
    end
  end

  def update
    if @project.update(project_params)
      render json: @project, serializer: AdminProjectSerializer
    else
      render :json => { errors: @project.errors }, :status => :bad_request
    end
  end

  def destroy
    @project.destroy
    render json: @project, serializer: AdminProjectSerializer
  end

  private

    def project_params
      params.require(:project).permit(:name, :surface, :labour, :location, :location_geometry, :image, :user_id)
    end

    def get_project
      @project = Project.find(params[:id])
    end
end

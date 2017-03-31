class ProjectsController < BypassController
  before_action :get_project, only: [:show, :edit, :update, :destroy]

  def index
    render json: Project.where({ user: params[:user_id] }).order(id: :desc)
  end

  def show
    render json: @project
  end

  def edit
    render json: @project
  end

  def create
    @project = Project.new(project_params)
    # TODO: Fix later
    # @project.user = current_user

    if @project.save
      render json: @project
    else
      render :json => { errors: @project.errors }, :status => :bad_request
    end
  end

  def update
    if @project.update(project_params)
      render json: @project
    else
      render :json => { errors: @project.errors }, :status => :bad_request
    end
  end

  def destroy
    @project.destroy
    render json: @project
  end

  private

    def project_params
      params.require(:project).permit(:name, :surface, :labour, :location, :location_geometry, :image, :user_id)
    end

    def get_project
      @project = Project.find(params[:id])
    end
end

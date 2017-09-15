class Family::ProjectsController < AuthorizedController
  before_action :get_project, only: [:show, :update, :destroy]

  def index
    render json: current_user.family_projects.order(id: :desc), each_serializer: FamilyProjectSerializer
  end

  def show
    render json: @project, serializer: FamilyProjectDetailSerializer
  end

  def create
    @project = Family::Project.new(project_params)
    @project.user = current_user

    if @project.save
      render json: @project, serializer: FamilyProjectSerializer
    else
      render :json => { errors: @project.errors }, :status => :bad_request
    end
  end

  def update
    if @project.update(project_params)
      render json: @project, serializer: FamilyProjectSerializer
    else
      render :json => { errors: @project.errors }, :status => :bad_request
    end
  end

  def destroy
    @project.destroy
    render json: @project, serializer: FamilyProjectSerializer
  end

  private

    def project_params
      params.require(:project).permit(:name, :package_id, :camera_id, :image)
    end

    def get_project
      @project = Family::Project.find(params[:id])
    end
end

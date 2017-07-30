class User::ProjectsController < AuthorizedController
  before_action :get_project, only: [:show, :edit, :update, :destroy]
  before_action :check_company_admin, only: [:index, :create]

  def index
    render json: Project.where({ user: current_user }).order(id: :desc)
  end

  def show
    render json: @project
  end

  def edit
    render json: @project
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user

    if @project.save
      hash_id = HashIdService.new.encode(@project.id)
      @project.update_attribute(:hash_id, hash_id)
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
      hash_id = params[:hash_id]
      id = HashIdService.new.decode(hash_id)
      @project = Project.find(id)
    end

    def check_company_admin
      unless current_user.is_company_admin?
        render json: {
            errors: [t(:only_allow_company_admin)]
          }, status: :unauthorized
        return false
      end
    end
end

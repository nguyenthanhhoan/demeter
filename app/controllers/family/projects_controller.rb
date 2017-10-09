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
    
    found_package = Family::Package.find_by_serial_name @project.package_id
    if found_package.blank?
      render :json => { error: 'Package ID not available!' }, :status => :bad_request
      return
    end
    if found_package.family_project_id.present?
      render :json => { error: 'Package ID had been used!' }, :status => :bad_request
      return
    end

    @project.user = current_user
    @project.package = found_package

    if @project.save
      found_package.update_attribute(:family_project_id, @project.id)
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
      params.require(:project).permit(:name, :package_id, :image)
    end

    def get_project
      @project = Family::Project.find(params[:id])
    end
end

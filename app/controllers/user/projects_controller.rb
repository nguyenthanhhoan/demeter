class User::ProjectsController < AuthorizedController
  before_action :get_project, only: [:show, :edit, :update, :destroy, :add_member, :list_member, :remove_member]
  before_action :check_company_admin, only: [:create]

  def index
    render json: (current_user.projects.order(id: :desc) + current_user.assigned_projects)
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

  def add_member
    email = params[:email]
    role = params[:role]
    add_member_result = AddMemberService.new.add_member_to_project(@project, email, role)
    case add_member_result[:code]
    when :error
      render :json => { errors: add_member_result[:errors] }, :status => :bad_request
    when :sent_email_invitation
      render_message "User not found. Sent email invitation to #{email}"
    when :member_added
      render :json => { errors: ["User with email: #{email} already added before"] }, :status => :bad_request
    when :member_added_success
      render_message "User with email: #{email} has been added to project"
    when :invitation_dupplicated
      render :json => { errors: ["User with email: #{email} has already invited before"] }, :status => :bad_request
    end
  end

  def remove_member 
    email = params[:email]
    user = User.find_by_email email
    if user.has_role? :project_admin, @project
      user.remove_role :project_admin, @project
    end
    if user.has_role? :project_user, @project
      user.remove_role :project_user, @project
    end
    render_message "Remove member out of project successfully!"
  end

  def list_member
    render json: {
      members: {
        admins: User.with_role(:project_admin, @project),
        users: User.with_role(:project_user, @project)
      },
      invitations: Invitation.where({
        resource_name: 'project',
        resource_id: @project.id
      }).order(id: :desc)
    }
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
            error: [t(:only_allow_company_admin)],
            type: :resource_protected
          }, status: :unauthorized
        return false
      end
    end
end

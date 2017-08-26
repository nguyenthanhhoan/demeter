class User::ZonesController < AuthorizedController
  before_action :get_zone, except: [:index, :create]

  def index
    hash_project_id = params[:project_id]
    project_id = HashIdService.new.decode(hash_project_id)
    project = Project.find project_id

    is_owner = current_user == project.user
    has_admin_role = current_user.has_role? :project_admin, project
    has_user_role = current_user.has_role? :project_user, project
    unless is_owner || has_admin_role || has_user_role
      render json: {
          error: [t(:only_allow_project_user)],
          type: :resource_protected
        }, status: :unauthorized
    else
      render json: Zone.where({ project: project_id }).order(id: :desc)
    end
  end

  def show
    authorize @zone
    render json: @zone
  end

  def edit
    authorize @zone
    render json: @zone
  end

  def create
    @zone = Zone.new(zone_params)
    @zone.user = current_user
    if @zone.save
      hash_id = HashIdService.new.encode(@zone.id)
      @zone.update_attribute(:hash_id, hash_id)
      render json: @zone
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def update
    authorize @zone
    if @zone.update(zone_params)
      render json: @zone
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def update_setting
    authorize @zone
    if @zone.update(zone_setting_params)
      render json: @zone
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def assign_camera
    authorize @zone
    camera = Camera.find params[:camera_id]
    @zone.cameras << camera
    render json: @zone
  end

  def unassign_camera
    authorize @zone
    camera = Camera.find params[:camera_id]
    @zone.cameras.delete camera
    render json: @zone
  end

  def assign_quick_view_camera
    authorize @zone
    camera_id = params[:camera_id]
    if @zone.camera_ids.include? camera_id
      camera_zone = @zone.cameras_zones.find_by_camera_id camera_id
      camera_zone.is_primary = true
      camera_zone.save!
    else
      @zone.cameras_zones.create({
        camera_id: camera_id,
        is_primary: true
      })
    end
    render json: @zone
  end

   def unassign_quick_view_camera
    authorize @zone
    camera_id = params[:camera_id]
    camera_zone = @zone.cameras_zones.find_by_camera_id camera_id
    camera_zone.is_primary = false
    camera_zone.save!
    render json: @zone
  end

  def update_image
    authorize @zone
    if @zone.update(zone_update_image_params)
      render json: @zone.image
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def destroy
    authorize @zone
    @zone.destroy
    render json: @zone
  end

  def add_member
    authorize @zone
    email = params[:email]
    role = params[:role]
    add_member_result = AddMemberService.new.add_member_to_zone(@zone, email, role)
    case add_member_result[:code]
    when :error
      render :json => { errors: add_member_result[:errors] }, :status => :bad_request
    when :sent_email_invitation
      render_message "User not found. Sent email invitation to #{email}"
    when :member_added
      render :json => { errors: ["User with email: #{email} already added before"] }, :status => :bad_request
    when :member_added_success
      render_message "User with email: #{email} has been added to zone"
    when :invitation_dupplicated
      render :json => { errors: ["User with email: #{email} has already invited before"] }, :status => :bad_request
    end
  end

  def remove_member
    authorize @zone
    email = params[:email]
    user = User.find_by_email email
    if user.has_role? :zone_admin, @zone
      user.remove_role :zone_admin, @zone
    end
    if user.has_role? :zone_user, @zone
      user.remove_role :zone_user, @zone
    end
    render_message "Remove member out of zone successfully!"
  end

  def list_member
    authorize @zone
    render json: {
      members: {
        admins: User.with_role(:zone_admin, @zone),
        users: User.with_role(:zone_user, @zone)
      },
      invitations: Invitation.where({
        resource_name: 'zone',
        resource_id: @zone.id
      }).order(id: :desc)
    }
  end

  private

    def zone_params
      project_id = params["zone"]["project_id"]
      params["zone"]["project_id"] = HashIdService.new.decode(project_id)
      params.require(:zone).permit(:project_id, :name, :zone_id, :start_date, :end_date,
        :plant, :plant_variety, :plant_quantity, :plant_quantity_unit, :device_gateway,
        :production_type, :estimate_yield, :estimate_yield_unit, :surface, :surface_unit,
        :zone_type, :growing_condition_type, :ownership_type, :labour, :location, :location_geometry, :image)
    end

    def zone_update_image_params
      params.require(:zone).permit(:image)
    end

    def zone_setting_params
      params.require(:zone).permit(:setting)
    end

    def get_zone
      hash_id = params[:hash_id]
      id = HashIdService.new.decode(hash_id)
      @zone = Zone.find(id)
    end
end

class User::ZonesController < AuthorizedController
  before_action :get_zone, only: [:show, :edit, :update, :update_setting,
    :assign_camera, :unassign_camera,
    :assign_quick_view_camera, :unassign_quick_view_camera, :update_image,
    :destroy]

  def index
    render json: Zone.where({ project: params[:project_id] }).order(id: :desc)
  end

  def show
    render json: @zone
  end

  def edit
    render json: @zone
  end

  def create
    @zone = Zone.new(zone_params)

    if @zone.save
      render json: @zone
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def update
    if @zone.update(zone_params)
      render json: @zone
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def update_setting
    if @zone.update(zone_setting_params)
      render json: @zone
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def assign_camera
    camera = Camera.find params[:camera_id]
    @zone.cameras << camera
    render json: @zone
  end

  def unassign_camera
    camera = Camera.find params[:camera_id]
    @zone.cameras.delete camera
    render json: @zone
  end

  def assign_quick_view_camera
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
    camera_id = params[:camera_id]
    camera_zone = @zone.cameras_zones.find_by_camera_id camera_id
    camera_zone.is_primary = false
    camera_zone.save!
    render json: @zone
  end

  def update_image
    if @zone.update(zone_update_image_params)
      render json: @zone.image
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def destroy
    @zone.destroy
    render json: @zone
  end

  private

    def zone_params
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
      @zone = Zone.find(params[:id])
    end
end

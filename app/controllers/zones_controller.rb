class ZonesController < BypassController
  before_action :get_zone, only: [:show, :edit, :update, :destroy]

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
    # TODO: Fix later
    # @zone.user = current_user

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

  def destroy
    @zone.destroy
    render json: @zone
  end

  private

    def zone_params
      params.require(:zone).permit(:project_id, :name, :zone_id, :start_date, :end_date,
        :plant, :plant_variety, :plant_quantity, :plant_quantity_unit,
        :production_type, :estimate_yield, :estimate_yield_unit, :surface, :surface_unit,
        :zone_type, :growing_condition_type, :ownership_type, :labour, :location, :image)
    end

    def get_project
      @project = Project.find(params[:project_id])
    end

    def get_zone
      @zone = Zone.find(params[:id])
    end
end

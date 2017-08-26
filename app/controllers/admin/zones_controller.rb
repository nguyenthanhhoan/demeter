class Admin::ZonesController < Admin::AdminController
  before_action :get_zone, only: [:show, :edit, :update, :destroy]

  def index
    render json: Zone.order(id: :desc), each_serializer: AdminZoneSerializer
  end

  def show
    render json: @zone, serializer: AdminZoneSerializer
  end

  def edit
    render json: @zone, serializer: AdminZoneSerializer
  end

  def create
    @zone = Zone.new(zone_params)

    if @zone.save
      render json: @zone, serializer: AdminZoneSerializer
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def update
    if @zone.update(zone_params)
      render json: @zone, serializer: AdminZoneSerializer
    else
      render :json => { errors: @zone.errors }, :status => :bad_request
    end
  end

  def destroy
    @zone.destroy
    render json: @zone, serializer: AdminZoneSerializer
  end

  private

    def zone_params
      params.require(:zone).permit(:name, :surface, :labour, :location, :location_geometry, :image, :user_id)
    end

    def get_zone
      @zone = Zone.find params[:id]
    end
end

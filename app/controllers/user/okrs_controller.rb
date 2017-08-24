class User::OkrsController < AuthorizedController
  before_action :get_okr, only: [:show, :edit, :update, :destroy]

  def index
    zone_id_encoded = params[:zone_id]
    zone_id = HashIdService.new.decode(zone_id_encoded)
    render json: Okr.where({ zone_id: zone_id }).order(order: :desc)
  end

  def show
    render json: @okr
  end

  def edit
    render json: @okr
  end

  def create
    @okr = okr.new(okr_params)

    if @okr.save
      render json: @okr
    else
      render :json => { errors: @okr.errors }, :status => :bad_request
    end
  end

  def update
    if @okr.update(okr_params)
      render json: @okr
    else
      render :json => { errors: @okr.errors }, :status => :bad_request
    end
  end

  def update_batch
    okr_batch_params[:okrs].each { |okr_params|
      if okr_params[:id].present?
        okr = Okr.find(okr_params[:id])
        okr.update!(okr_params)
      else
        Okr.create!(okr_params)
      end
    }
  end

  def destroy
    @okr.destroy
    render json: @okr
  end

  private

    def okr_params
      params.require(:okr).permit(:order, :name)
    end

    def okr_batch_params
      # Decode zone_id
      zone_id_encoded = params["okrs"][0]["zone_id"]
      if zone_id_encoded.present?
        zone_id = HashIdService.new.decode(zone_id_encoded)
        params["okrs"].each { |okr| 
          okr["zone_id"] = zone_id
        }
      end
      params.permit(:okrs => [:name, :order, :id, :zone_id])
    end

    def get_okr
      @okr = Okr.find(params[:id])
    end
end

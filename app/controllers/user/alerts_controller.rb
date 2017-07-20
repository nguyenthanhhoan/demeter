class User::AlertsController < AuthorizedController
  before_action :get_zone

  def index
    render json: Alert.where({ zone: @zone }).order(id: :desc)
  end

  private

    def get_zone
      @zone = Zone.find(params[:zone_id])
    end
end

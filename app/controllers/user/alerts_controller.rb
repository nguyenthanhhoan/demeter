class User::AlertsController < AuthorizedController
  before_action :get_zone

  def index

    total_items = Alert.where({ zone: @zone }).count

    ransack = Alert.ransack({
      zone_id_eq: @zone.id
    })
    ransack.sorts = 'id desc'

    items = ransack.result.paginate(page: params[:page], per_page: params[:per_page])
    items_json = ActiveModelSerializers::SerializableResource.new(items)

    render json: {
      items: items_json,
      total_items: total_items
    }, each_serializer: AlertSerializer, adapter: :json, root_key: 'items'
  end

  private

    def get_zone
      @zone = Zone.find(params[:zone_id])
    end
end

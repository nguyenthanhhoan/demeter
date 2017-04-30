class User::DeviceFieldsController < AuthorizedController

  def index
    render json: DeviceField.all.order(id: :desc)
  end

end

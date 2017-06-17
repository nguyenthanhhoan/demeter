class WebhookController < ActionController::Base
  before_action :authenticate

  def update_device_value
    gateway = params[:gateway]
    field_id = params[:field_id]
    value = params[:value]

    field_value = DeviceField.joins(:device).find_by({ 
      'devices.name': gateway,
      field_id: field_id
    })

    if field_value.present?
      field_value.update_attribute(:value, value)
      render :json => { message: 'Update successfully!' }
    else
      self.status = :internal_server_error
      render :json => {
        message: 'Cannot find field_value!',
      }
    end
  end

  private
 
    def authenticate
      unless params[:access_token] == '07f0f540-0e56-4e2b-a4ef-b154ed7a53ff'
        self.status = :unauthorized
        render :json => {
          message: 'Authenticate false!',
        }
      end
    end
end

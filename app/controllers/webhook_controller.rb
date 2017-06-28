class WebhookController < ActionController::Base
  before_action :authenticate
  rescue_from Exception, with: :server_error

  def update_device_value
    gateway = params[:gateway]
    field_id = params[:field_id]
    value = params[:value]

    field_value = DeviceField.joins(:device).find_by({ 
      'devices.name': gateway,
      field_id: field_id
    })

    if field_value.present?
      # Currently, support integer only
      if field_value.integer?
        old_value = Integer(field_value.value)
        new_value = Integer(value)
        if new_value != old_value
          field_value.update_attribute(:value, value)
          DeviceValueHistory.create!({
            device_field: field_value,
            value: new_value,
            created_at: Time.new.to_i
          })
          render :json => { message: 'Update successfully!' }
        else 
          render :json => { message: 'Value not changed. Update not performed!' }
        end
      else
        render :json => { message: 'Can only update for integer field!' }
      end
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

    def server_error(error)
      logger.error error.message
      error.backtrace[0..10].each { |line| logger.error line }
      render json: {
        error: error.message,
        key: 'Exception'
      }, status: :internal_server_error
    end
end

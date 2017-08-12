class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include Pundit
  protect_from_forgery
  rescue_from Exception, with: :server_error
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def render_message(msg)
    render json: {
      message: msg
    }
  end
  def user_not_authorized
    message = 'You are not authorized to perform this action.'
    self.status = :unauthorized

    # resource_protected is used to differentiate with default devise unauthorized
    # (which is not required re-login)
    render json: { error: message, type: :resource_protected}
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

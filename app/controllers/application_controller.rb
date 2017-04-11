class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  rescue_from Exception, with: :server_error

  def user_not_authorized
    message = 'You are not authorized to perform this action.'
    self.status = :unauthorized
    render json: { error: message }
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

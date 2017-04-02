class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken

  def user_not_authorized
    message = 'You are not authorized to perform this action.'
    self.status = :unauthorized
    render json: { error: message }
  end
end

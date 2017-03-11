class SessionsController < Devise::SessionsController
  skip_before_filter :verify_authenticity_token

  def create
    invalidMsg = 'Email or Password is invalid'

    email = params[:user][:email] || ''

    user = User.find_by_email(email.downcase)

    if user.present?
      if user.valid_password? params[:user][:password]
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        user_serialized = ActiveModelSerializers::SerializableResource.new(user)
        render :json => {
          message: 'Login successfully!',
          csrfParam: request_forgery_protection_token,
          csrfToken: form_authenticity_token,
          user: user_serialized.as_json,
        }
      else
        logger.debug 'Wrong password'
        self.status = :unauthorized
        render :json => { error: invalidMsg }
      end
    else
      logger.debug 'Email not exist'
      self.status = :unauthorized
      render :json => { error: invalidMsg }
    end
  end

  def destroy
    invalidMsg = 'Cannot sign out'
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    if signed_out
      render :json => {
        message: 'Sign out successfully!',
        csrfParam: request_forgery_protection_token,
        csrfToken: form_authenticity_token
      }
    else
      self.status = :internal_server_error
      render :json => { error: invalidMsg }
    end
  end
end

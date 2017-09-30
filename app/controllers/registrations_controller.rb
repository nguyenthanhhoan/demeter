class RegistrationsController < ApplicationController

  #
  # Create Registration record
  #
  def create
    registration = Registration.new(registration_params)

    if registration.save
      RegistrationMailer.notify_email(registration).deliver_later
      render json: { message: t(:registration_successfully) }
    else
      render :json => { errors: registration.errors }, :status => :bad_request
    end
  end

  #
  # Create user in Sign Up form
  #
  def sign_up
    # user = User.new(user_params)
    # user.add_role :family_user
    # if user.save
    #   username = "#{user.first_name.downcase}-#{user.last_name.downcase}-#{user.id}"
    #   user.update_attribute(:username, URI.escape(username))
    #   render json: user
    # else
    #   render :json => { errors: user.errors }, :status => :bad_request
    # end
  end

  def create_user_from_invitation
    token = params[:token]
    invitation = Invitation.find_by_token token
    user = User.new(user_params)
    if invitation.present? && invitation.email == user.email
      if user.save
        if invitation.resource_name.to_sym == :project
          project = Project.find invitation.resource_id
          user.add_role(invitation.role.to_sym, project)
        elsif invitation.resource_name.to_sym == :zone
          zone = Zone.find invitation.resource_id
          user.add_role(invitation.role.to_sym, zone)
        end
        invitation.destroy
        render json: user
      else
        render :json => { errors: user.errors }, :status => :bad_request
      end
    else
      render :json => { error: 'Invitation not exist' }, :status => :bad_request
    end
    
  end

  private
    def registration_params
      params.require(:registration).permit(:email, :phone, :address)
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end

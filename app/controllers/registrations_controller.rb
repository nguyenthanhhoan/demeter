class RegistrationsController < ApplicationController

  def create
    registration = Registration.new(registration_params)

    if registration.save
      RegistrationMailer.notify_email(registration).deliver_later
      render json: { message: t(:registration_successfully) }
    else
      render :json => { errors: registration.errors }, :status => :bad_request
    end
  end

  private
    def registration_params
      params.require(:registration).permit(:email, :phone, :address)
    end
end

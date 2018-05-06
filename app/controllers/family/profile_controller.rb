class Family::ProfileController < AuthorizedController
  def update
    current_user.update!(profile_params)
    render json: current_user
  end

  def update_password
    if current_user.update_with_password(change_password_params)
      # Sign in the user by passing validation in case their password changed
      bypass_sign_in(current_user)
      render json: current_user
    else
      render json: { errors: current_user.errors }, status: :bad_request
    end
  end

  private

  def profile_params
    params.require(:user).permit(:first_name, :last_name)
  end

  def change_password_params
    params.require(:user).permit(:current_password, :password, :password_confirmation)
  end
end

class User::ProfileController < AuthorizedController

  def update
    if current_user.update(user_params)
      render json: current_user, serializer: UserProfileSerializer
    else
      render :json => { errors: @user.errors }, :status => :bad_request
    end
  end

  private

    def user_params
      params.require(:user).permit(:full_name, :image)
    end
end

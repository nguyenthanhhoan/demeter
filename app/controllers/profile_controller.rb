class ProfileController < AuthorizedController
  def get_current_user
    render json: current_user, serializer: UserProfileSerializer
  end
end

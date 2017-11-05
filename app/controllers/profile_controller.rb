class ProfileController < AuthorizedController
  def get_current_user
    render json: current_user, serializer: UserProfileSerializer
  end

  def mark_notification
    NotificationService.new.mark_as_read(current_user)
    render_message 'Mark notification as read successfully!'
  end
end

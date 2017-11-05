class Admin::TestingController < Admin::AdminController
  def create_notification
    notification = notification_params
    user = User.find_by_email notification[:email]
    content = notification[:content]
    image_url = notification[:image_url]
    if NotificationService.new.create_notification(user, :alert, content, image_url)
      render json: notification
    else
      render :json => { error: 'Cannot create notification!' }, :status => :bad_request
    end
  end

  private
    def notification_params
      params.require(:notification).permit(:email, :content, :image_url)
    end
end

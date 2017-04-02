class Admin::AdminController < AuthorizedController
  before_action :user_is_admin

  def user_is_admin
    unless current_user.is_admin?
      user_not_authorized
    end
  end
end

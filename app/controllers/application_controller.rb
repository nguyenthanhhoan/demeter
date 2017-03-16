class ApplicationController < ActionController::Base
  # TODO: Fix later
  before_action :authenticate_user!

  protect_from_forgery with: :exception
end

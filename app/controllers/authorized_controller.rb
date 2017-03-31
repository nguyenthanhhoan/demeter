class AuthorizedController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :authenticate_user!

  # protect_from_forgery with: :exception
end

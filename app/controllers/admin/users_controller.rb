class Admin::UsersController < Admin::AdminController
  before_action :get_user, only: [:show, :edit, :update, :destroy]

  def index
    users = User.without_role(:admin).order(id: :desc)
    render json: users, each_serializer: AdminUserSerializer
  end

  def show
    render json: @user, serializer: AdminUserSerializer
  end

  def edit
    render json: @user, serializer: AdminUserSerializer
  end

  def create
    @user = User.new(user_params)
    is_company_admin = params[:user][:is_company_admin]

    if @user.save
      update_role()
      render json: @user
    else
      render :json => { errors: @user.errors }, :status => :bad_request
    end
  end

  def update
    if @user.update(user_params)
      update_role()
      render json: @user
    else
      render :json => { errors: @user.errors }, :status => :bad_request
    end
  end

  def destroy
    @user.destroy
    render json: @user
  end

  private

    def user_params
      params.require(:user).permit(:id, :name, :email, :username, :is_company_admin, :is_family_user, :password, :password_confirmation)
    end

    def get_user
      @user = User.find(params[:id])
    end

    def update_role
      if @user.is_company_admin
        @user.add_role :company_admin
      else 
        @user.remove_role :company_admin
      end
      if @user.is_family_user
        @user.add_role :family_user
      else 
        @user.remove_role :family_user
      end
    end
end

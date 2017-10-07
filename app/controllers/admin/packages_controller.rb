class Admin::PackagesController < Admin::AdminController
  before_action :get_package, only: [:show, :edit, :update, :destroy]

  def index
    packages = Family::Package.order(id: :desc)
    render json: packages, each_serializer: AdminPackageSerializer
  end

  def show
    render json: @package, serializer: AdminPackageSerializer
  end

  def edit
    render json: @package, serializer: AdminPackageSerializer
  end

  def create
    @package = Family::Package.new(package_params)
    if @package.save
      render json: @package
    else
      render :json => { errors: @package.errors }, :status => :bad_request
    end
  end

  def update
    if @package.update(package_params)
      render json: @package
    else
      render :json => { errors: @package.errors }, :status => :bad_request
    end
  end

  def destroy
    @package.destroy
    render json: @package
  end

  private

    def package_params
      params.require(:package).permit(:id, :serial_name)
    end

    def get_package
      @package = Family::Package.find(params[:id])
    end
end

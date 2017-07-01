class User::ProgramExecutionsController < AuthorizedController
  before_action :get_zone
  before_action :get_program_execution, only: [:show, :edit, :update, :destroy]

  def index
    render json: ProgramExecution.where({ zone: @zone }).order(id: :desc)
  end

  def show
    render json: @program_execution
  end

  def edit
    render json: @program_execution
  end

  def create
    @program_execution = ProgramExecution.new(program_execution_params)

    if @program_execution.save
      render json: @program_execution
    else
      render :json => { errors: @program_execution.errors }, :status => :bad_request
    end
  end

  def update
    if @program_execution.update(program_execution_params)
      render json: @program_execution
    else
      render :json => { errors: @program_execution.errors }, :status => :bad_request
    end
  end

  def destroy
    @program_execution.destroy
    render json: @program_execution
  end

  private

    def get_zone
      @zone = Zone.find(params[:zone_id])
    end

    def program_execution_params
      params.require(:program_execution).permit(:name, :zone_id, :is_active, :input, :output)
    end

    def get_program_execution
      @program_execution = ProgramExecution.find(params[:id])
    end
end

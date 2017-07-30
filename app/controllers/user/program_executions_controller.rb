class User::ProgramExecutionsController < AuthorizedController
  before_action :get_zone_id
  before_action :get_program_execution, only: [:show, :update, :destroy]

  def index
    render json: ProgramExecution.where({ zone_id: @zone_id }).order(id: :desc)
  end

  def show
    render json: @program_execution
  end

  def create
    @program_execution = ProgramExecution.new(program_execution_params)

    if @program_execution.save
      ProgramExecutionService.new.update_job(@program_execution)
      render json: @program_execution
    else
      render :json => { errors: @program_execution.errors }, :status => :bad_request
    end
  end

  def update
    if @program_execution.update(program_execution_params)
      job = ProgramExecutionService.new.update_job(@program_execution)
      render json: {
        program_execution: @program_execution,
        job: job
      }
    else
      render :json => { errors: @program_execution.errors }, :status => :bad_request
    end
  end

  def destroy
    ProgramExecutionService.new.remove_job(@program_execution)
    @program_execution.destroy
    render json: @program_execution
  end

  private

    def get_zone_id
      hash_id = params[:zone_id]
      @zone_id = HashIdService.new.decode(hash_id)
    end

    def program_execution_params
      params.require(:program_execution).permit(:name, :zone_id, :is_active, 
        :from_time, :to_time, :schedule, :input, :output)
    end

    def get_program_execution
      @program_execution = ProgramExecution.find(params[:id])
    end
end

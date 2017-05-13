class User::OkrObjectivesController < AuthorizedController
  before_action :get_okr_objective, only: [:show, :edit, :update, :destroy]

  def index
    render json: OkrObjective.where({ okr_id: params[:okr_id] }).order(id: :desc)
  end

  def show
    render json: @okr_objective
  end

  def edit
    render json: @okr_objective
  end

  def create
    @okr_objective = OkrObjective.new(okr_objective_params)

    if @okr_objective.save
      render json: @okr_objective
    else
      render :json => { errors: @okr_objective.errors }, :status => :bad_request
    end
  end

  def update
    if @okr_objective.update(okr_objective_params)
      render json: @okr_objective
    else
      render :json => { errors: @okr_objective.errors }, :status => :bad_request
    end
  end

  def destroy
    @okr_objective.destroy
    render json: @okr_objective
  end

  private

    def okr_objective_params
      params.require(:okr_objective).permit(:okr_id, :date_from, :date_to, :objective, 
        :key_results_attributes => [:id, :description, :status, :pic, :start_date, :original_deadline, :deadline1, :note, :_destroy])
    end

    def get_okr_objective
      @okr_objective = OkrObjective.find(params[:id])
    end
end

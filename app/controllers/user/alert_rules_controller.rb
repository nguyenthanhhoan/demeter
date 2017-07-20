class User::AlertRulesController < AuthorizedController
  before_action :get_zone
  before_action :get_alert_rule, only: [:update, :show, :destroy]

  def index
    render json: AlertRule.where({ zone: @zone }).order(id: :desc)
  end

  def show
    render json: @alert_rule
  end

  def create
    @alert_rule = AlertRule.new(alert_rule_params)

    if @alert_rule.save
      job = AlertService.new.update_job(@alert_rule)
      render json: {
        alert_rule: @alert_rule,
        job: job
      }
    else
      render :json => { errors: @alert_rule.errors }, :status => :bad_request
    end
  end

  def update
    if @alert_rule.update(alert_rule_params)
      job = AlertService.new.update_job(@alert_rule)
      render json: {
        alert_rule: @alert_rule,
        job: job
      }
    else
      render :json => { errors: @alert_rule.errors }, :status => :bad_request
    end
  end

  def destroy
    AlertService.new.remove_job(@alert_rule)
    @alert_rule.destroy
    render json: @alert_rule
  end

  private

    def get_zone
      @zone = Zone.find(params[:zone_id])
    end

    def alert_rule_params
      params.require(:alert_rule).permit(:id, :name, :device_field_id, :zone_id, :schedule,
        :condition, :value, :interval, :live_chart_rule, :is_active)
    end

    def get_alert_rule
      @alert_rule = AlertRule.find(params[:id])
    end
end

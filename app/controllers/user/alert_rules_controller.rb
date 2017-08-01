class User::AlertRulesController < AuthorizedController
  before_action :get_zone_id
  before_action :get_alert_rule, only: [:update, :show, :destroy]

  def index
    render json: AlertRule.where({ zone_id: @zone_id }).order(id: :desc)
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

    def get_zone_id
      hash_id = params[:zone_id]
      @zone_id = HashIdService.new.decode(hash_id)
    end

    def alert_rule_params
      zone_id = params[:zone_id]
      params["alert_rule"]["zone_id"] = HashIdService.new.decode(zone_id)
      params.require(:alert_rule).permit(
        :id, :name, :device_field_id, :zone_id, :schedule,
        :condition, :value, :interval, :live_chart_rule, :is_active,
        :from_time, :to_time, :trigger_email, :trigger_emails,
        :trigger_message, :trigger_messages, :trigger_call, :trigger_calls)
    end

    def get_alert_rule
      @alert_rule = AlertRule.find(params[:id])
    end
end

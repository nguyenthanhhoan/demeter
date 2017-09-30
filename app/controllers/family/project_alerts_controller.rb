class Family::ProjectAlertsController < AuthorizedController
  before_action :get_project, only: [:show, :update]

  def show
    check_exist_and_create()
    render json: @alert, serializer: FamilyProjectAlertSerializer
  end

  def update
    check_exist_and_create()
    if @alert.update(alert_params)
      render json: @alert, serializer: FamilyProjectAlertSerializer
    else
      render :json => { errors: @alert.errors }, :status => :bad_request
    end
  end

  private

    def alert_params
      params.require(:alert).permit(:interval, :trigger_notification, :trigger_notifications, 
        :trigger_email, :trigger_emails, :trigger_message, :trigger_messages,
        :rules)
    end

    def check_exist_and_create
      @alert = @project.alert
      unless @alert.present?
        # One project need to have one alert, need to create one
        @alert = Family::ProjectAlert.create!({
          family_project_id: @project.id
        })
      end
    end

    def get_project
      @project = Family::Project.find params[:id]
    end

end

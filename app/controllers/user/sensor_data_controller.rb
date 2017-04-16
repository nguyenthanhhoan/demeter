class User::SensorDataController < AuthorizedController

  def query_in_timestamp
    sensor_data = DynamodbService.get_data_in(params[:start_timestamp], params[:end_timestamp])
    render json: sensor_data
  end

end

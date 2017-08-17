class SpeedSMSService

  # Send messsage to phone number via SpeedSMS API
  # Get user detail by curl
  # curl -i -u "{API access token}:x" "http://api.speedsms.vn/index.php/user/info"
  def send_message(message, phones)
    require 'rest-client'
    url = "http://api.speedsms.vn/index.php/sms/send"
    token = ENV['speed_sms_access_token']
    authorization = Base64.encode64("#{token}:x")
    send_data = {
      to: phones,
      content: message,
      sms_type: 2,
      sender: 'demeter'
    }
    response = RestClient.post url, send_data.to_json, {:Authorization => "Basic #{authorization}"}
    Rails.logger.info 'response speed sms'
    Rails.logger.info JSON.parse(response.body)
  end
end
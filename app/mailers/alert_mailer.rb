class AlertMailer < ApplicationMailer

  def send_email(message, email)
    @message = message
    mail(to: email, subject: 'Demeter Alert!')
  end
end

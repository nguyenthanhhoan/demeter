class RegistrationMailer < ApplicationMailer

  def notify_email(registration)
    @registration = registration
    mail(to: ENV['mailer_to'], subject: 'Trial Session Registration!')
  end
end

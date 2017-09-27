class FamilyAlertMailer < ApplicationMailer
  
    def send_email(alert, message, email)
      @project = alert.project
      @message = message
      @deploy_path = ENV['DEPLOYED_PATH']
      mail(to: email, subject: 'Demeter Alert!')
    end
  end
  
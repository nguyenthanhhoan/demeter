class InvitationMailer < ApplicationMailer

  def invite_to_project(invitation, email)
    @invitation = invitation
    @deploy_path = ENV['DEPLOYED_PATH']
    mail(to: email, subject: t(:email_invite_to_project_title))
  end
end

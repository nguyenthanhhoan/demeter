class InvitationMailer < ApplicationMailer

  def invite_to_project(invitation, email)
    @invitation = invitation
    @deploy_path = ENV['DEPLOYED_PATH']
    mail(to: email, subject: t(:email_invite_to_project_title))
  end

  def invite_to_zone(invitation, email)
    @invitation = invitation
    @deploy_path = ENV['DEPLOYED_PATH']
    mail(to: email, subject: t(:email_invite_to_zone_title))
  end

  def added_to_project(project, email)
    @project_name = project.name
    @path = ENV['DEPLOYED_PATH'] + "/#/user/project/#{project.hash_id}"
    mail(to: email, subject: t(:email_added_to_project_title))
  end

  def added_to_zone(zone, email)
    @zone_name = zone.name
    project_id = zone.project.hash_id
    zone_id = zone.hash_id
    @path = ENV['DEPLOYED_PATH'] + "/#/user/project/#{project_id}/zone/#{zone_id}"
    mail(to: email, subject: t(:email_added_to_zone_title))
  end
end

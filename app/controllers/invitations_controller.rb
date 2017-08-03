class InvitationsController < ApplicationController
  def get_invitation
    uuid = params[:uuid]
    invitation = Invitation.find_by_token uuid

    if invitation.present?
      render json: invitation
    else
      render :json => { error: 'Invitation token not found' }, :status => :not_found
    end
  end
end

class User::InvitationsController < AuthorizedController
  before_action :get_invitation, only: [:destroy]

  def destroy
    @invitation.destroy
    render json: @invitation
  end

  private
    def get_invitation
      @invitation = Invitation.find params[:id]
    end
end

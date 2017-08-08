class AddMemberService
  def add_member_to_project(project, email, role)
    user = User.find_by_email email
    result = {}
    unless user

      found_invitation = Invitation.where({
        email: email,
        resource_name: 'project',
        resource_id: project.id
      })

      if found_invitation.count > 0
        result[:code] = :invitation_dupplicated
        return result
      end
      invitation = Invitation.new({
        email: email,
        role: role.to_sym,
        resource_name: 'project',
        resource_id: project.id
      })
      invitation.token = SecureRandom.uuid

      if invitation.save
        InvitationMailer.invite_to_project(invitation, email).deliver_later
        result[:code] = :sent_email_invitation
        result[:invitation] = invitation
      else
        result[:code] = :error
        result[:errors] = :invitation.error
      end
      return result
    else 
      has_admin_role = user.has_role? :project_admin, project
      has_user_role = user.has_role? :project_user, project
      if has_admin_role || has_user_role
        result[:code] = :member_added
        return result
      end
    end
    user.add_role(role.to_sym, project)
    result[:code] = :member_added_success
    result
  end

  def add_member_to_zone(zone, email, role)
    user = User.find_by_email email
    result = {}
    unless user

      found_invitation = Invitation.where({
        email: email,
        resource_name: 'zone',
        resource_id: zone.id
      })

      if found_invitation.count > 0
        result[:code] = :invitation_dupplicated
        return result
      end
      invitation = Invitation.new({
        email: email,
        role: role.to_sym,
        resource_name: 'zone',
        resource_id: zone.id
      })
      invitation.token = SecureRandom.uuid

      if invitation.save
        InvitationMailer.invite_to_zone(invitation, email).deliver_later
        result[:code] = :sent_email_invitation
        result[:invitation] = invitation
      else
        result[:code] = :error
        result[:errors] = :invitation.error
      end
      return result
    else 
      has_admin_role = user.has_role? :zone_admin, zone
      has_user_role = user.has_role? :zone_user, zone
      if has_admin_role || has_user_role
        result[:code] = :member_added
        return result
      end
    end
    user.add_role(role.to_sym, zone)
    result[:code] = :member_added_success
    result
  end
end
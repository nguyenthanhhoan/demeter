class ZonePolicy < ApplicationPolicy

  def show?
    owner_admin_user?
  end

  def edit?
    owner_admin?
  end

  def update?
    owner_admin?
  end

  def update_setting?
    owner_admin?
  end

  def assign_camera?
    owner_admin?
  end

  def unassign_camera?
    owner_admin?
  end

  def assign_quick_view_camera?
    owner_admin?
  end

  def unassign_quick_view_camera?
    owner_admin?
  end

  def update_image?
    owner_admin?
  end

  def destroy?
    owner_admin?
  end

  def add_member?
    owner_admin?
  end

  def remove_member?
    owner_admin?
  end

  def list_member?
    owner_admin?
  end

  private
    def owner_admin_user?
      project_id = HashIdService.new.decode(record.project.hash_id)
      project = Project.find project_id
      is_owner = user == project.user
      has_project_admin_role = user.has_role? :project_admin, project
      has_project_user_role = user.has_role? :project_user, project
      has_admin_role = user.has_role? :zone_admin, record
      has_user_role = user.has_role? :zone_user, record
      is_owner || has_project_admin_role || has_project_user_role || has_admin_role || has_user_role
    end

    def owner_admin?
      project_id = HashIdService.new.decode(record.project.hash_id)
      project = Project.find project_id
      is_owner = user == project.user
      has_project_admin_role = user.has_role? :project_admin, project
      has_admin_role = user.has_role? :zone_admin, record
      is_owner || has_project_admin_role || has_admin_role
    end
end
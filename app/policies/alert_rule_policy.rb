class AlertRulePolicy < ApplicationPolicy
  
    def show?
      owner_admin_user?
    end
  
    def create?
      owner_admin?
    end
    
    def update?
      owner_admin?
    end
    
    def destroy?
      owner_admin?
    end
  
    private
      def owner_admin_user?
        zone = Zone.includes(:project).find record.zone_id
        project = zone.project
        is_owner = user.id == project.user_id
        has_project_admin_role = user.has_role? :project_admin, project
        has_project_user_role = user.has_role? :project_user, project
        has_admin_role = user.has_role? :zone_admin, record
        has_user_role = user.has_role? :zone_user, record
        is_owner || has_project_admin_role || has_project_user_role || has_admin_role || has_user_role
      end
  
      def owner_admin?
        # TODO: Cannot eager load project here, check later
        zone = Zone.includes(:project).find record.zone_id
        project = zone.project
        is_owner = user.id == project.user_id
        has_project_admin_role = user.has_role? :project_admin, project
        has_admin_role = user.has_role? :zone_admin, record
        is_owner || has_project_admin_role || has_admin_role
      end
    end
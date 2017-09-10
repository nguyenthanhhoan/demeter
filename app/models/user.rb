class User < ApplicationRecord
  rolify
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # note that this include statement comes AFTER the devise block above
  include DeviseTokenAuth::Concerns::User

  has_many :projects

  after_create :assign_default_role
  mount_uploader :image, ImageUploader

  # List all project that user has been assigned to
  def assigned_projects
    Project.with_roles([:project_admin, :project_user], self)
  end

  def count_project
    self.projects.count + self.assigned_projects.count
  end

  def assigned_zone
    # TODO: Later on, should query list of zone instead
    Zone.with_roles([:zone_admin, :zone_user], self).first
  end

  def assign_default_role
    self.add_role(:user) if self.roles.blank?
  end

  def role
    if self.is_admin?
      :admin
    elsif self.is_family_user?
      :family_user
    else
      :user
    end
  end
end

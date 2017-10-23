class AdminUserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :name, :username, :is_confirm, :is_company_admin

  def is_company_admin
    object.is_company_admin?
  end

  def is_confirm
    object.confirmed?
  end
end

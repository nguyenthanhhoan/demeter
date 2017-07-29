class AdminUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name , :is_company_admin

  def is_company_admin
    object.is_company_admin?
  end
end

# SSO on 8 Oct, 2017
['corp_user'].each do |role_name|
  Role.create! name: role_name
end

user = User.find_by_email 'user@example.com'
user.add_role :corp_user

caudatfarm = User.find_by_email 'caudatfarm@demeter.vn'
caudatfarm.add_role :corp_user

# Confirmation on 21, Oct, 2017
User.all.each { |user|
  user.update_attribute(:confirmed_at, DateTime.now)
}
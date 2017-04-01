['admin', 'user'].each do |role_name|
  Role.create! name: role_name
end

admin = User.create({
  email: 'admin@example.com',
  password: '123456'
})
admin.add_role :admin

caudatfarm = User.create({
  email: 'caudatfarm@demeter.vn',
  password: '123456'
})
caudatfarm.add_role :user
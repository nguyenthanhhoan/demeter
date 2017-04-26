10.times { |x|
  User.create({
    email: "test#{x}@example.com",
    password: '123456'
  })
}

Camera.create({
  camera_no: "NO.11",
  camera_name: "Camera 11",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b12',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT11',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.12",
  camera_name: "Camera 12",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b13',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT12',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.13",
  camera_name: "Camera 13",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b14',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT13',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.14",
  camera_name: "Camera 14",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b15',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT14',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.15",
  camera_name: "Camera 15",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b16',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT15',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.16",
  camera_name: "Camera 16",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b17',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT16',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.17",
  camera_name: "Camera 17",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b18',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT17',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.18",
  camera_name: "Camera 18",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b19',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT18',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.19",
  camera_name: "Camera 19",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b20',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT19',
  server: '29h2.vp9.tv'
})

Camera.create({
  camera_no: "NO.20",
  camera_name: "Camera 20",
  api: :vp9,
  live_hash: 'b931dc96ff225818e9c83146ecdf273ac79c981117a56b8583c12a4b547e57b21',
  playback_hash: 'c67c1d93865b094d83342761d41be0e8950f7d5ff26606cc78509533dc3b04cc',
  secret_id: '1',
  channel: 'DMT20',
  server: '29h2.vp9.tv'
})

Device.create({
  name: "cdf-gateway",
  device_type: :gateway,
  api: :aws,
  created_by: User.find_by_email('admin@example.com')
})

DeviceField.create([{
  # Temp field
  device: Device.find_by_name('cdf-gateway'),
  field_id: 'field1',
  name: 'B1 - Temp',
  name_display: 'Temperature',
  value: '25.8',
  value_data_type: :float,
  field_attribute: :read_only,
  update_type: :field_interval,
  interval: 5
}, {
  # Fan field
  device: Device.find_by_name('cdf-gateway'),
  field_id: 'field11',
  name: 'B11 - Fan',
  name_display: 'Fan',
  value: '1',
  value_data_type: :integer,
  field_attribute: :read_write,
  update_type: :field_changed
}])
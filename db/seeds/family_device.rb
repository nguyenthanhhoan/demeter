def create_wfami_package(id) 
  package = Family::Package.create!({
    serial_name: id
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field1',
    name: 'Temperature',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: '*C'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field2',
    name: 'Humidity',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: '%'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field3',
    name: 'Illuminances',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'lx'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field4',
    name: 'Soil Moisture',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: '%'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field5',
    name: 'pH',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'pH'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field6',
    name: 'EC',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'mS'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field7',
    name: 'CO2',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'ppm'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field8',
    name: 'Device1',
    value_data_type: :integer,
    field_attribute: :read_write
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field9',
    name: 'Device2',
    value_data_type: :integer,
    field_attribute: :read_write
  })
end

def create_gfami_package(id)
  package = Family::Package.create!({
    serial_name: id
  })
  Family::Device.create!({
    package: package,
    field_id: 'field1',
    name: 'Temperature',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: '*C'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field2',
    name: 'Humidity',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: '%'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field3',
    name: 'Illuminances',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'lx'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field4',
    name: 'Soil Moisture',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: '%'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field5',
    name: 'pH',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'pH'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field6',
    name: 'EC',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'mS'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field7',
    name: 'CO2',
    value_data_type: :float,
    field_attribute: :read_only,
    chart_value_suffix: 'ppm'
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field8',
    name: 'Device1',
    value_data_type: :integer,
    field_attribute: :read_write
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field9',
    name: 'Device2',
    value_data_type: :integer,
    field_attribute: :read_write
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field10',
    name: 'Device3',
    value_data_type: :integer,
    field_attribute: :read_write
  })
  
  Family::Device.create!({
    package: package,
    field_id: 'field11',
    name: 'Device4',
    value_data_type: :integer,
    field_attribute: :read_write
  })
end

create_wfami_package('wifami-001')
create_wfami_package('wifami-002')
create_wfami_package('wifami-003')
create_gfami_package('gfami-001')
create_gfami_package('gfami-002')
create_gfami_package('gfami-003')


package = Family::Package.create!({
  serial_name: 'dmt-client'
})

Family::Device.create!({
  package: package,
  field_id: 'field1',
  name: 'Temperature',
  value: 33.5,
  value_in_float: 33.5,
  value_data_type: :float,
  field_attribute: :read_only,
  chart_value_suffix: '*C'
})

Family::Device.create!({
  package: package,
  field_id: 'field2',
  name: 'Humidity',
  value: 66.3,
  value_in_float: 66.3,
  value_data_type: :float,
  field_attribute: :read_only,
  chart_value_suffix: '%'
})

Family::Device.create!({
  package: package,
  field_id: 'field3',
  name: 'Illuminances',
  value: 66.3,
  value_in_float: 66.3,
  value_data_type: :integer,
  field_attribute: :read_only,
  chart_value_suffix: 'lx'
})

Family::Device.create!({
  package: package,
  field_id: 'field5',
  name: 'EC',
  value: 66.3,
  value_in_float: 66.3,
  value_data_type: :float,
  field_attribute: :read_only,
  chart_value_suffix: 'mS'
})

Family::Device.create!({
  package: package,
  field_id: 'field4',
  name: 'EC',
  value: 6.96,
  value_in_float: 6.96,
  value_data_type: :float,
  field_attribute: :read_only,
  chart_value_suffix: 'pH'
})

Family::Device.create!({
  package: package,
  field_id: 'field11',
  name: 'BULB 1',
  value: '0',
  value_data_type: :integer,
  field_attribute: :read_write,
  mode: :manual
})

Family::Device.create!({
  package: package,
  field_id: 'field12',
  name: 'BULB 2',
  value: '0',
  value_data_type: :integer,
  field_attribute: :read_write,
  mode: :manual
})

Family::Device.create!({
  package: package,
  field_id: 'field13',
  name: 'FAN 1',
  value: '0',
  value_data_type: :integer,
  field_attribute: :read_write,
  mode: :manual
})

Family::Device.create!({
  package: package,
  field_id: 'field14',
  name: 'FAN 2',
  value: '0',
  value_data_type: :integer,
  field_attribute: :read_write,
  mode: :manual
})

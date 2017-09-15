class Family::Device < ApplicationRecord
  belongs_to :package, class_name: 'Family::Package', foreign_key: 'family_package_id'

  enum field_attribute: [ :read_only, :read_write ]

  #
  # Need to duplicate data_type 
  # In order to optimize ransack query
  #
  enum value_data_type: [ :integer, :float, :string ]
end

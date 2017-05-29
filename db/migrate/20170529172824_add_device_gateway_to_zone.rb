class AddDeviceGatewayToZone < ActiveRecord::Migration[5.0]
  def change
    add_column :zones, :device_gateway, :string
  end
end

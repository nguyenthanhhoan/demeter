class CreateWUndergroundCaches < ActiveRecord::Migration[5.0]
  def change
    create_table :w_underground_caches do |t|
      t.string :location
      t.string :service_type
      t.text :content

      t.timestamps
    end
  end
end

class AddScheduleToProgramExecution < ActiveRecord::Migration[5.0]
  def change
    add_column :program_executions, :schedule, :string
  end
end

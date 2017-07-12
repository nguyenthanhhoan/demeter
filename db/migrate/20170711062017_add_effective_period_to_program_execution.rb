class AddEffectivePeriodToProgramExecution < ActiveRecord::Migration[5.0]
  def change
    add_column :program_executions, :from_time, :datetime
    add_column :program_executions, :to_time, :datetime
  end
end

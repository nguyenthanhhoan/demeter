class ProgramExecutionSerializer < ApplicationSerializer
  attributes :id, :name, :zone_id, :is_active, :schedule, :from_time, :to_time, :input, :output

  def input
    JSON.parse(object.input)
  end

  def output
    JSON.parse(object.output)
  end

  def from_time
    time_to_s(object.from_time)
  end

  def to_time
    time_to_s(object.to_time)
  end
end

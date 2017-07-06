class ProgramExecutionSerializer < ActiveModel::Serializer
  attributes :id, :name, :zone_id, :is_active, :schedule, :input, :output

  def input
    JSON.parse(object.input)
  end

  def output
    JSON.parse(object.output)
  end
end

class OkrSerializer < ActiveModel::Serializer
  attributes :id, :order, :zone_id, :name, :objectives

  def objectives
    object.okr_objectives.map do |okr_objective|
      OkrObjectiveSerializer.new(okr_objective, scope: scope, root: false)
    end
  end
end

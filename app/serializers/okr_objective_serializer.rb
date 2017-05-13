class OkrObjectiveSerializer < ActiveModel::Serializer
  attributes :id, :date_from, :date_to, :objective, :key_results

  def date_from
    object.date_from.to_s
  end

  def date_to
    object.date_to.to_s
  end

  has_many :key_results, serializer: OkrObjectiveKeySerializer
end

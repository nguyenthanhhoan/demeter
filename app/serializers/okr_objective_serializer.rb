class OkrObjectiveSerializer < ApplicationSerializer
  attributes :id, :date_from, :date_to, :objective, :key_results

  def date_from
    date_to_s(object.date_from)
  end

  def date_to
    date_to_s(object.date_to)
  end

  has_many :key_results, serializer: OkrObjectiveKeySerializer
end

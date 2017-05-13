class OkrObjectiveKey < ApplicationRecord
  belongs_to :okr_objective

  enum status: [ :planned, :in_progress, :pending, :delay, :finish ]
end

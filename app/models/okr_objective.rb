class OkrObjective < ApplicationRecord
  belongs_to :okr

  has_many :key_results, class_name: 'OkrObjectiveKey', :inverse_of => :okr_objective, dependent: :destroy

  accepts_nested_attributes_for :key_results, allow_destroy: true
end

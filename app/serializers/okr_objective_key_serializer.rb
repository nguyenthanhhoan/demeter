class OkrObjectiveKeySerializer < ApplicationSerializer
  attributes :id, :description, :status, :pic, :start_date, :original_deadline, :deadline1, :note

  def start_date
    date_to_s(object.start_date)
  end

  def original_deadline
    date_to_s(object.original_deadline)
  end

  def deadline1
    date_to_s(object.deadline1)
  end

  def pic
    if object.pic.blank?
      []
    else
      object.pic.split('|||')
    end
  end
end

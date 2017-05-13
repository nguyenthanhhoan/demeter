class OkrObjectiveKeySerializer < ActiveModel::Serializer
  attributes :id, :description, :status, :pic, :start_date, :original_deadline, :deadline1, :note

  def start_date
    object.start_date.to_s
  end

  def original_deadline
    object.original_deadline.to_s
  end

  def deadline1
    object.deadline1.to_s
  end

  def pic
    if object.pic.blank?
      []
    else
      object.pic.split('|||')
    end
  end
end

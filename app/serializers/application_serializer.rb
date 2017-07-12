class ApplicationSerializer < ActiveModel::Serializer
  def date_to_s(date)
    if date.present?
      date.strftime('%m/%d/%Y')
    end
  end

  def time_to_s(date_time)
    if date_time.present?
      date_time.strftime('%m/%d/%Y %H:%M')
    end
  end
end

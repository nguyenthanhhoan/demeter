class ApplicationSerializer < ActiveModel::Serializer
  def date_to_s(date)
    if date.present?
      date.strftime('%m/%d/%Y')
    end
  end

  def date_to_iso(date)
    if date.present?
      date.strftime('%Y-%m-%d')
    end
  end

  def time_to_s(date_time)
    if date_time.present?
      date_time.iso8601
    end
  end
end

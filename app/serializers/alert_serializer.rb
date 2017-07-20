class AlertSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :id, :alert_content, :icon, :created_at, :time_display

  def time_display
    time_ago_in_words(object.created_at)
  end
end

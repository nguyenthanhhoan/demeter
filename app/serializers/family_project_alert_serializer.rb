class FamilyProjectAlertSerializer < ApplicationSerializer
  attributes :interval, :trigger_notification, :trigger_notifications,
    :trigger_email, :trigger_emails, :trigger_message, :trigger_messages,
    :rules

  def rules
    if object.rules.present?
      JSON.parse(object.rules)
    end
  end
end

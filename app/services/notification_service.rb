class NotificationService

  def create_notification(user, type, content, image_url)
    Family::Notification.create!({
      user: user,
      noti_type: type,
      content: content,
      image_url: image_url
    })
    sync_firebase_noti(user)
  end

  def create_notification_family_project(user, type, content, family_project)
    image_url = family_project.image? ? family_project.image.thumb.url : nil
    create_notification(user, type, content, image_url)
  end
  
  def get_firebase
    base_uri = ENV['google_firebase_url']
    Firebase::Client.new(base_uri)
  end

  def create_firebase_noti(notification)
    {
      content: notification.content,
      is_read: notification.is_read,
      created_at: notification.created_at,
      image_url: notification.image_url
    }
  end

  def sync_firebase_noti(user)
    firebase = get_firebase
    last_10_notifications = Family::Notification.where({
      user: user
    }).order(id: :desc).limit(10)

    firebase_notifications = last_10_notifications.map{ |notification|
      create_firebase_noti(notification)
    }
    response = firebase.set("notifications_#{user.uuid}", firebase_notifications)
    response.success? # => true
  end

  def mark_as_read(user)
    unread_notifications = Family::Notification.where({
      user: user,
      is_read: false
    })
    unread_notifications.update_all(is_read: true)
    sync_firebase_noti(user)
  end
end
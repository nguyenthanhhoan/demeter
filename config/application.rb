require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Demeter
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.active_job.queue_adapter = :sidekiq

    config.action_mailer.default_url_options = { host: ENV['VIRTUAL_HOST'] }
    config.action_mailer.asset_host = "http://#{ENV['VIRTUAL_HOST']}"

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      :address              => ENV['mailer_stmp'],
      :port                 => 587,
      :user_name            => ENV['mailer_username'],
      :password             => ENV['mailer_password'],
      :authentication       => :login,
      :enable_starttls_auto => true
    }
  end
end

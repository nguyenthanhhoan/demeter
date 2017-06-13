require File.expand_path('../config/environment', __dir__)

job_type :sidekiq, "cd :path && :environment_variable=:environment /usr/local/bin/bundle exec /usr/local/bin/sidekiq-client push :task :output"

every :hour do
  sidekiq "DynamoDbCacheWorker"
end

every 10.minutes do
  sidekiq "DynamoDbCacheLatestWorker"
end
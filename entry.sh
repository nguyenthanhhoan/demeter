#!/bin/bash

sleep 30s
cron
whenever --update-crontab
bundle exec sidekiq -C config/sidekiq.yml -q default -q mailers
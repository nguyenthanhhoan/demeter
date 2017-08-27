#!/bin/bash

# Wait for other service get ready
sleep 60s

cd /rails/dmt-device
npm install
forever -o out.log -e err.log index.js
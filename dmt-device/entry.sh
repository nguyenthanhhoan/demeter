#!/bin/bash
cd /rails/dmt-device
npm install
forever -o out.log -e err.log index.js
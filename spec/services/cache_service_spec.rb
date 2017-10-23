require 'rails_helper'

describe CacheService do
  let(:data) { 
    JSON.parse('[{
      "payload": {
        "data": {
          "field1": "0.0",
          "field2": "-1.0",
          "field3": "0.0"
        },
        "deviceId": "wifami-003",
        "timestamp": "1507990574646.0"
      },
      "deviceId": "wifami-003",
      "timestamp": "1507990574646.0"
    }, {
      "payload": {
        "data":{
          "field1": "0.0",
          "field2": "0.0",
          "field3": "0.0"
        },
        "deviceId": "wifami-003",
        "timestamp": "1507990602227.0"
      }
    }, {
      "payload": {
        "data":{
          "field1": "0.0",
          "field2": "0.0",
          "field3": "0.0"
        },
        "deviceId": "wifami-003",
        "timestamp": "1507990622872.0"
      }
    }]')
  }
  describe 'lastest_data_outdated?' do
    it 'should return false is lastest_data is out of date' do
      timestamp_24h_ago = 1507990574647.0
      expect(CacheService.new.lastest_data_outdated?(data, timestamp_24h_ago)).to eq(true)
    end

    it 'should return false is lastest_data is out of date' do
      timestamp_24h_ago = 1507990574645.0
      expect(CacheService.new.lastest_data_outdated?(data, timestamp_24h_ago)).to eq(false)
    end
  end
end

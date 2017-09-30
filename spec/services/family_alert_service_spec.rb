require 'rails_helper'

describe FamilyAlertService do

  describe 'rule_match_content?' do
    it 'should return false for read_write device that value didnt match' do
      device_class_double = class_double('Family::Device').as_stubbed_const({
        transfer_nested_constants: true
      })

      device_double = double('Family::Device', {
        read_write?: true,
        value_parsed: 1
      })
      allow(device_class_double).to receive(:find_by_uuid).and_return(device_double)

      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        value: 0
      }
      expect(FamilyAlertService.new.rule_match_content?(rule)).to eq(false)
    end

    it 'should return true for read_write device that value matched' do
      device_class_double = class_double('Family::Device').as_stubbed_const({
        transfer_nested_constants: true
      })

      device_double = double('Family::Device', {
        read_write?: true,
        value_parsed: 0
      })
      allow(device_class_double).to receive(:find_by_uuid).and_return(device_double)

      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        value: 0
      }
      expect(FamilyAlertService.new.rule_match_content?(rule)).to eq(true)
    end

    it 'should return true for read_only device that value matched alert' do
      device_class_double = class_double('Family::Device').as_stubbed_const({
        transfer_nested_constants: true
      })

      device_double = double('Family::Device', {
        read_write?: false,
        read_only?: true,
        value_parsed: 40.0
      })
      allow(device_class_double).to receive(:find_by_uuid).and_return(device_double)

      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        condition: 'gt',
        value: 39
      }
      expect(FamilyAlertService.new.rule_match_content?(rule)).to eq(true)
    end

    it 'should return false for read_only device that value didnt match alert' do
      device_class_double = class_double('Family::Device').as_stubbed_const({
        transfer_nested_constants: true
      })

      device_double = double('Family::Device', {
        read_write?: false,
        read_only?: true,
        value_parsed: 40.0
      })
      allow(device_class_double).to receive(:find_by_uuid).and_return(device_double)

      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        condition: 'lt',
        value: 39
      }
      expect(FamilyAlertService.new.rule_match_content?(rule)).to eq(false)
    end
  end

  describe 'build_alert_message' do
    it 'should build correct alert message for read_write device' do
      device_class_double = class_double('Family::Device').as_stubbed_const({
        transfer_nested_constants: true
      })

      device_double = double('Family::Device', {
        name: 'Pump',
        read_write?: true,
        value_parsed: 1
      })
      allow(device_class_double).to receive(:find_by_uuid).and_return(device_double)

      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        value: 1
      }
      expect(FamilyAlertService.new.build_alert_message(rule)).to eq('Pump is ON')
    end

    it 'should build correct alert message for read_only device' do
      device_class_double = class_double('Family::Device').as_stubbed_const({
        transfer_nested_constants: true
      })

      device_double = double('Family::Device', {
        name: 'Temp',
        read_write?: false,
        read_only?: true,
        value_parsed: 35.0
      })
      allow(device_class_double).to receive(:find_by_uuid).and_return(device_double)

      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        value: 30.4,
        condition: 'gt'
      }
      expect(FamilyAlertService.new.build_alert_message(rule)).to eq('Temp is greater than 30.4')
    end
  end

  describe 'first_time_or_timeout?' do
    it 'should return true if run first time' do
      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        value: 30.4,
        condition: 'gt'
      }
      expect(FamilyAlertService.new.first_time_or_timeout?(rule, 0, 0)).to eq(true)
    end

    it 'should return false if duration less than timeout' do
      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        value: 30.4,
        condition: 'gt',
        # Friday, September 29, 2017 12:00:00 AM
        last_alert: 1506643200
      }
      current_time = Time.new(2017, 9, 29, 0, 30, 0).to_i
      timeout = 31 * 60
      expect(FamilyAlertService.new.first_time_or_timeout?(rule, timeout, current_time)).to eq(false)
    end

    it 'should return true if duration greater than timeout' do
      rule = {
        device_uuid: '5ea76f2b-c8e8-4151-bd9f-f89f510e8d40',
        value: 30.4,
        condition: 'gt',
        # Friday, September 29, 2017 12:00:00 AM
        last_alert: 1506643200
      }
      current_time = Time.new(2017, 9, 29, 0, 30, 0).to_i
      timeout = 29 * 60
      expect(FamilyAlertService.new.first_time_or_timeout?(rule, timeout, current_time)).to eq(true)
    end
  end
end

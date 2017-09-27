require 'rails_helper'

describe FamilyAlertService do

  describe '.build_cron' do
    it 'should return correct cron job' do
      interval = 5
      time_zone = 'Asia/Ho_Chi_Minh'
      expect(FamilyAlertService.new.build_cron(interval, time_zone)).to eq('*/5 * * * * Asia/Ho_Chi_Minh')
    end
  end

  describe '.update_job' do
    it 'should create correct Sidekiq::Cron::Job instance' do
      cron_job_class_double = class_double('Sidekiq::Cron::Job').as_stubbed_const({
        transfer_nested_constants: true
      })

      cron_job_double = double('Sidekiq::Cron::Job', :valid? => true, :save => true)
      allow(cron_job_class_double).to receive(:new).and_return(cron_job_double)
      allow(cron_job_class_double).to receive(:destroy).and_return(nil)

      alert = instance_double('Alert', :id => 1, :interval => 10)
      job_name = 'FamilyAlert_1'

      expect(cron_job_class_double).to receive(:new).with({
        name: job_name,
        cron: '*/10 * * * * Asia/Ho_Chi_Minh',
        class: 'FamilyAlertWorker',
        args: [alert.id]
      })
      FamilyAlertService.new.update_job(alert)
    end
  end

  describe 'rule_match?' do
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
      expect(FamilyAlertService.new.rule_match?(rule)).to eq(false)
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
      expect(FamilyAlertService.new.rule_match?(rule)).to eq(true)
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
      expect(FamilyAlertService.new.rule_match?(rule)).to eq(true)
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
      expect(FamilyAlertService.new.rule_match?(rule)).to eq(false)
    end

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
end

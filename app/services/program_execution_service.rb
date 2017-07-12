class ProgramExecutionService

  def get_job_name(program_execution_id)
    "ProgramExecution_#{program_execution_id}"
  end

  def update_job(program_execution)
    if program_execution.is_active
      time_zone = program_execution.zone.time_zone
      job_name = get_job_name(program_execution.id)

      remove_job(program_execution)
      job = Sidekiq::Cron::Job.new({
        name: job_name,
        cron: "#{program_execution.schedule} #{time_zone}",
        class: 'ProgramExecutionWorker',
        args: [program_execution.id]
      })

      if job.valid?
        job.save
      else
        job.errors
      end
    else
      remove_job(program_execution)
    end
  end

  def remove_job(program_execution)
    job_name = get_job_name(program_execution.id)
    Sidekiq::Cron::Job.destroy job_name
  end

  def in_period?(from_time, to_time, time_zone)
    current_time = Time.current.in_time_zone(time_zone)
    from_time_tz = from_time.in_time_zone(time_zone)
    to_time_tz = to_time.in_time_zone(time_zone)
    from_time_tz <= current_time && to_time_tz >= current_time
  end

  def execute(program_execution_id)
    program_execution = ProgramExecution.find program_execution_id
    zone = program_execution.zone
    time_zone = zone.time_zone

    unless program_execution.is_active
      #
      # Program_execution is not active
      # Destroy the job
      #
      Rails.logger.info "[ProgramExecutionWorker] [program_execution_id=#{program_execution_id}] is not active. Prepare to destroy the job"
      job_name = ProgramExecutionService.get_job_name(program_execution_id)
      Sidekiq::Cron::Job.destroy job_name
      return
    end

    unless in_period?(program_execution.from_time, program_execution.to_time, time_zone)
      Rails.logger.info "[ProgramExecutionWorker] [program_execution_id=#{program_execution_id}] not in period. Skip running"
      return
    end

    Rails.logger.info "[ProgramExecutionWorker] [program_execution_id=#{program_execution_id}] is about to perform"

    input = JSON.parse(program_execution.input, :symbolize_names => true)

    if input_match?(input, zone)
      Rails.logger.info "[ProgramExecutionWorker] [program_execution_id=#{program_execution_id}] input match. Output is about to perform"
      output = JSON.parse(program_execution.output, :symbolize_names => true)
      execute_output(output, zone)
    else 
      Rails.logger.info "[ProgramExecutionWorker] [program_execution_id=#{program_execution_id}] input not match. Cancel executing output"
    end
  end

  #
  # Convert query builder operator to ransack operator
  #
  def operator(query_builder_ope)
    mapping_operator = {
      'equal': 'eq',
      'greater': 'gt',
      'greater_or_equal': 'gteq',
      'less': 'lt',
      'less_or_equal': 'lteq'
    }
    mapping_operator[query_builder_ope.to_sym]
  end

  # {
  #   "output": {
  #     "condition": "AND",
  #     "rules": [
  #       {
  #         "id": "field_101",
  #         "field": "field_101",
  #         "type": "integer",
  #         "input": "number",
  #         "operator": "equal",
  #         "value": "1"
  #       },
  #       {
  #         "id": "field123",
  #         "field": "field123",
  #         "type": "integer",
  #         "input": "number",
  #         "operator": "equal",
  #         "value": "1"
  #       }
  #     ]
  #   

  def execute_output(output, zone)
    output[:rules].each { |rule|
      field_id = rule[:id]
      value = rule[:value]

      device_field = zone.device_fields.find_by_field_id field_id

      if device_field.value != value
        device_field.value = value
        AwsIotService.update_thing_shadow(device_field)
      else
        Rails.logger.info "[ProgramExecutionWorker] [device_field=#{field_id}, zone_id=#{zone.id}]. No need to update"
      end
    }
  end

  # operator [
  #   'equal', 'not_equal', 'in', 'not_in', 'less', 'less_or_equal', 
  #   'greater', 'greater_or_equal', 'between', 'not_between', 
  #   'begins_with', 'not_begins_with', 'contains', 'not_contains', 
  #   'ends_with', 'not_ends_with', 'is_empty', 'is_not_empty', 'is_null', 'is_not_null']
  def input_match?(input, zone)

    # input = {
    #   condition: "OR",
    #   rules: [{
    #     "id": "field123",
    #     "operator": "greater",
    #     "value": "25"
    #   }, {
    #     "id": "humidity",
    #     "operator": "greater",
    #     "value": "5"
    #   }]
    # }

    ransack_query = {
      g: []
    }
    if input[:condition] == "OR"
      ransack_query[:m] = 'or'
    end

    input[:rules].each{ |rule|
      ransack_operator = operator(rule[:operator])
      field_id = rule[:id]

      rule_query = {
        g: [{
          # field_id_eq: field_id,
          "value_in_int_#{ransack_operator}": Integer(rule[:value]),
          # device_name_eq: zone.device_gateway
        }]
      }
      ransack_query[:g] << rule_query
    }
    Rails.logger.info ransack_query.to_s
    DeviceField.ransack(ransack_query).result.count > 0
  end
end


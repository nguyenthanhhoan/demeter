class WUndergroundJob < ApplicationJob
  queue_as :default

  def perform(*args)
    projects = Project.all

    projects.each_with_index { |project, index|
      WUndergroundProjectJob.set(wait: index.minute).perform_later project
    }
  end
end

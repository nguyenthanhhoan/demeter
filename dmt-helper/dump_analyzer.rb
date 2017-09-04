require 'json'

#
# Helper rails class for analyzing rbtrace's dump report
#
class DumpAnalyzer  
  def initialize(filename)
    @filename = filename
  end

  def analyze
    data = []
    puts "start parsing file"
    File.open(@filename) do |f|
      f.each_line do |line|
        data << (parsed = JSON.parse(line))
      end
    end
    puts "end parsing file"
    data.group_by { |row| row["generation"] }
    .sort{ |a, b| a[0].to_i <=> b[0].to_i }
    .each do |k, v|
      puts "generation #{k} objects #{v.count}"
    end
    ""
  end

  def analyze_by_generation(generation)
    data = []
    File.open(@filename) do |f|
      f.each_line do |line| 
        parsed = JSON.parse(line)
        data << parsed if parsed["generation"] == generation
      end
    end

    data.group_by{ |row| "#{row["file"]}:#{row["line"]}" }
    .sort{ |a,b| b[1].count <=> a[1].count }
    .each do |k,v|
      puts "#{k} * #{v.count}"
    end
    ""
  end
end

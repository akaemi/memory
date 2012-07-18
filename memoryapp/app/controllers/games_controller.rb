class GamesController < ApplicationController
  # get 'cards' for memory game
  def memory
    # get json feed, store in hash
    result = Hashie::Mash.new HTTParty.get("http://api.ravelry.com/projects/akaemi/progress.json?status=finished&key=0e3904e749b478766294964e01322c78b53ef411")
    
    # grab pictures, store in array
    thumbnails = Array.new
    index = 0;

    result["projects"].each{|key, value| 
      thumbnail = key["thumbnail"]
      thumbnails[index] = thumbnail["src"]
      index += 1
    }
    
    # create 2d Array to store pics, ids
    size = 12
    @pictures = Array.new 
    i=0
    
    # grab first set of pics
    while (i<size/2) 
      pic = Array.new
      pic[0] = i
      pic[1] = thumbnails[i]
      @pictures[i] = pic
      i += 1
    end
    
    # copy first set of pics again
    while (i<size) 
      @pictures[i] = @pictures[i-(size/2)]
      i += 1
    end
    
    # randomize pictures
    @pictures.shuffle!
    
  end

  # Get details on a specific project; look up by thumbnail
  def projectDetails
    projectUrl = params[:url]
    projectUrl = projectUrl[4..-2]
    puts projectUrl
    result = Hashie::Mash.new HTTParty.get("http://api.ravelry.com/projects/akaemi/progress.json?status=finished&key=0e3904e749b478766294964e01322c78b53ef411")   
    
    # find the right project
    result["projects"].each{|key, value| 
      thumbnail = key["thumbnail"]
      puts thumbnail["src"]
      if (thumbnail["src"].eql? projectUrl) 
        puts "found a match"
        @project = key;
      end
    }
    
    respond_to do |format|
      format.json
    end
    
  end
end

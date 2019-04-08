require 'sinatra/base'

class App < Sinatra::Base
  set :bind, '0.0.0.0'

  get '/' do
    File.read('views/index.html')
  end
end

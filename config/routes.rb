Rails.application.routes.draw do
  resources :projects
  devise_for :users, :skip => [:sessions]
  
  as :user do
    post '/login' => 'sessions#create', :as => :user_session
    delete '/logout' => 'sessions#destroy', :as => :destroy_user_session
  end
end

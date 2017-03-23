Rails.application.routes.draw do
  
  devise_for :users, :skip => [:sessions]
  
  resources :projects do
    resources :zones
  end
  resources :cameras
  
  as :user do
    post '/login' => 'sessions#create', :as => :user_session
    delete '/logout' => 'sessions#destroy', :as => :destroy_user_session
  end
end

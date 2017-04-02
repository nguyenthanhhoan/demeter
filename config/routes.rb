Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  resources :projects do
    resources :zones
  end
  resources :cameras

  get '/current_user' => 'profile#get_current_user'

  namespace :admin do
    resources :projects
  end
end

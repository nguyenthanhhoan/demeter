Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  resources :projects do
    resources :zones do
      member do
        post 'setting' => 'zones#update_setting'
        post 'assign_camera' => 'zones#assign_camera'
        post 'unassign_camera' => 'zones#unassign_camera'
      end
    end
  end
  resources :cameras

  get '/current_user' => 'profile#get_current_user'

  namespace :admin do
    resources :projects
    resources :zones
    resources :cameras
  end
end

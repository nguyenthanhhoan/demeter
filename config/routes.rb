Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  resources :projects do
    resources :zones do
      member do
        post 'setting' => 'zones#update_setting'
        post 'assign_camera' => 'zones#assign_camera'
        post 'unassign_camera' => 'zones#unassign_camera'
        post 'assign_quick_view_camera' => 'zones#assign_quick_view_camera'
        post 'unassign_quick_view_camera' => 'zones#unassign_quick_view_camera'
      end
    end
  end
  resources :cameras

  get '/current_user' => 'profile#get_current_user'

  namespace :admin do
    resources :projects
    resources :zones
    resources :cameras
    resources :devices do
      resources :device_fields
    end
  end

  namespace :user do 
    get '/sensor_data/timestamp/:start_timestamp/:end_timestamp' => 'sensor_data#query_in_timestamp'
  end
end

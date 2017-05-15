Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  # TODO: Move to namespace /user
  resources :projects do
    resources :zones do
      member do
        post 'setting' => 'zones#update_setting'
        post 'assign_camera' => 'zones#assign_camera'
        post 'unassign_camera' => 'zones#unassign_camera'
        post 'assign_quick_view_camera' => 'zones#assign_quick_view_camera'
        post 'unassign_quick_view_camera' => 'zones#unassign_quick_view_camera'
        post 'assign_device_field' => 'zones#assign_device_field'
        post 'unassign_device_field' => 'zones#unassign_device_field'
        put 'update_image' => 'zones#update_image'
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
    resources :okrs do
      collection do
        post 'update_batch' => 'okrs#update_batch'
      end
    end
    resources :okr_objectives
    get '/sensor_data/timestamp/:start_timestamp/:end_timestamp' => 'sensor_data#query_in_timestamp'
    get '/device_fields' => 'device_fields#index'
    get '/weather/:service_type/:location' => 'weather#query', constraints: { location: /[^\/]+/ }
  end
end

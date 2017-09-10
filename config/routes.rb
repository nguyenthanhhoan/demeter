Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  
  # TODO: Move to namespace /user
  resources :cameras

  get '/current_user' => 'profile#get_current_user'
  post '/register' => 'registrations#create'
  post '/sign_up' => 'registrations#sign_up'
  post '/create_user_from_invitation' => 'registrations#create_user_from_invitation'
  post '/webhook/update_device_value' => 'webhook#update_device_value'
  get '/invitations/:uuid' => 'invitations#get_invitation'

  namespace :admin do
    resources :users
    resources :projects
    resources :zones
    resources :cameras
    resources :devices do
      resources :device_fields
    end
  end

  namespace :user do
    resources :projects, param: :hash_id do
      member do
        get 'list_member' => 'projects#list_member'
        post 'add_member' => 'projects#add_member'
        post 'remove_member' => 'projects#remove_member'
      end
    end
    resources :zones, param: :hash_id do
      member do
        post 'setting' => 'zones#update_setting'
        post 'assign_camera' => 'zones#assign_camera'
        post 'unassign_camera' => 'zones#unassign_camera'
        post 'assign_quick_view_camera' => 'zones#assign_quick_view_camera'
        post 'unassign_quick_view_camera' => 'zones#unassign_quick_view_camera'
        put 'update_image' => 'zones#update_image'
        get 'list_member' => 'zones#list_member'
        post 'add_member' => 'zones#add_member'
        post 'remove_member' => 'zones#remove_member'
      end
    end
    resources :okrs do
      collection do
        post 'update_batch' => 'okrs#update_batch'
      end
    end
    resources :program_executions
    resources :alert_rules
    resources :alerts, only: [:index]
    resources :okr_objectives
    resources :device_fields, only: [:index] do
      collection do
        get 'list_device_updatable' => 'device_fields#list_device_updatable'
        get 'list_device_assigned' => 'device_fields#list_device_assigned'
        post 'assign_device_to_zone' => 'device_fields#assign_device_to_zone'
        post 'unassign_device_to_zone' => 'device_fields#unassign_device_to_zone'
        post 'update_device_value' => 'device_fields#update_device_value'
        post 'update_order' => 'device_fields#update_order'
      end
    end
    resources :invitations, only: [:destroy]
    get '/sensor_data/timestamp/:start_timestamp/:end_timestamp' => 'sensor_data#query_in_timestamp'
    get '/sensor_data/date/:date/zone/:zone_id' => 'sensor_data#query_in_date'
    get '/sensor_data/latest' => 'sensor_data#query_lastest'
    get '/weather/:service_type/:location' => 'weather#query', constraints: { location: /[^\/]+/ }
    get '/device_value/lastest/gateway/:gateway/field_id/:field_id' => 'device_value_histories#query_lastest'
    put '/profile' => 'profile#update'
  end

  require 'sidekiq/web'
  require 'sidekiq/cron/web'

  authenticate :user, lambda { |u| u.is_admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end
end

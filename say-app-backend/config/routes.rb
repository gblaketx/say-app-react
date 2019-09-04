Rails.application.routes.draw do
  get 'users/index'
  get 'user/index'
  get 'test_data/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api' do
    devise_for :users, :skip => :registrations

    resources :ratings
    resources :comments

    resources :users do
      member do
        put 'toggle_admin_role'
        put 'toggle_approved_status'
      end
      collection do 
        get 'users'
        get 'admin_tools'
        get 'new_submitter'
        post 'create_submitter'
        get 'leaderboards'
      end
    end

    resources :documents do
    resources :ratings, :comments
      member do 
        post 'toggle_approved'
        post 'toggle_flag'
      end
      collection do 
        get 'download'
        get 'gimme_another'
      end
    end

    resources :artworks do
      member do 
        post 'toggle_approved'
        post 'toggle_flag'
      end
      collection do 
        get 'download'
        get 'gimme_another'
      end
      resources :ratings, :comments
    end

    resources :settings, only: [:index, :edit, :update] do
      collection do
        get 'export_to_csv'
        get 'export_rejected_to_csv'
      end
    end
  end


  # You can have the root of your site routed with "root" TODO: needed?
  root to: 'home#index'
end

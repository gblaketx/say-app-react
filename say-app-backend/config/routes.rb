Rails.application.routes.draw do
  get 'users/index'
  get 'user/index'
  get 'test_data/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :test_data
    devise_for :users, :skip => :registrations
    resources :users
    resources :documents
  end


  # You can have the root of your site routed with "root" TODO: needed?
  root 'home#index'
end

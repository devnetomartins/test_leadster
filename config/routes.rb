require 'sidekiq/web'

Rails.application.routes.draw do
  resources :contacts, only: [:index, :create, :show, :update, :destroy] do
    collection do
      get 'search/', action: :search
    end
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    ActiveSupport::SecurityUtils.secure_compare(username, ENV['SIDEKIQ_USER'])
    ActiveSupport::SecurityUtils.secure_compare(password, ENV['SIDEKIQ_PASSWORD'])
  end

  mount Sidekiq::Web => '/sidekiq'

  root :to => redirect('/contacts')
end

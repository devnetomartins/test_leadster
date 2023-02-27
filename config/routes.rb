Rails.application.routes.draw do
  resources :contacts, only: [:index, :create, :show, :update, :destroy] do
    collection do
      get 'search/', action: :search
    end
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root :to => redirect('/contacts')
end

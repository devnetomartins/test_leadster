Rails.application.routes.draw do
  resources :contacts, only: [:index, :create, :show, :update, :destroy]
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root :to => redirect('/contacts')
end

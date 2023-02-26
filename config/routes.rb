Rails.application.routes.draw do
  get 'contacts', action: :index, controller: 'contacts'
  post 'contacts', action: :create, controller: 'contacts'
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root :to => redirect('/contacts')
end

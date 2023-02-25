Rails.application.routes.draw do
  get 'pages/home'
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root 'pages#home'
end

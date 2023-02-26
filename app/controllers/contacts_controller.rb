class ContactsController < ApplicationController
  before_action :authenticate_user!

  def index
    contacts = user_contacts.paginate(page: current_page, per_page: params[:per_page] || 20)

    @contacts_serialized = ActiveModelSerializers::SerializableResource.new(contacts, each_serializer: ContactSerializer).to_json
  end

  private

  def current_page
    params[:page] || 1
  end

  def user_contacts
    @user_contacts ||= current_user.contacts
  end
end

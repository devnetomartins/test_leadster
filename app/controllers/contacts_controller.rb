class ContactsController < ApplicationController
  before_action :authenticate_user!

  def index
    contacts = user_contacts.paginate(page: current_page, per_page: params[:per_page] || 20)

    @contacts_serialized = ActiveModelSerializers::SerializableResource.new(contacts, each_serializer: ContactSerializer).to_json
  end

  def create
    result = Contacts::CreateContactService.perform(create_contact_params, current_user)

    if result.valid?
      render json: {location: contacts_url, contact: result.contact}, status: 200
    else
      render json: {error: result.error}, status: 422
    end
  end

  private

  def create_contact_params
    params.permit(:full_name, :email, :document_number, :birthday_date, phones: %i[number whatsapp])
  end

  def current_page
    params[:page] || 1
  end

  def user_contacts
    @user_contacts ||= current_user.contacts
  end
end

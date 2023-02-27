class ContactsController < ApplicationController
  before_action :authenticate_user!

  def index
    contacts = user_contacts.paginate(page: current_page, per_page: params[:per_page] || 20)

    @user_email = current_user.email
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

  def show
    contact = Contact.find(params[:id])
    contact.build_address unless contact.address

    contact_serialized = ActiveModelSerializers::SerializableResource.new(contact).to_json

    render json: contact_serialized, status: 200
  end

  def update
  end

  def destroy
    Contact.find(params[:id]).delete

    render json: {message: "Deleted contact with success", location: contacts_url }, status: 200
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

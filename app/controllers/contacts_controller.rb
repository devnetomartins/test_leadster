class ContactsController < ApplicationController
  before_action :authenticate_user!

  CONTACTS_PER_PAGE = 2

  def index
    contacts = user_contacts.paginate(page: current_page, per_page: CONTACTS_PER_PAGE)

    @user_email = current_user.email
    @contacts_serialized = ActiveModelSerializers::SerializableResource.new(contacts, each_serializer: ContactSerializer).to_json
    @total_pages = contacts&.total_pages || 0
  end

  def create
    result = Contact::CreateContactService.perform(create_contact_params, current_user)

    if result.valid?
      render json: {location: contacts_url, contact: result.contact}, status: 200
    else
      render json: {error: result.errors.first}, status: 422
    end
  end

  def show
    contact = Contact.find(params[:id])
    contact.build_address unless contact.address

    contact_serialized = ActiveModelSerializers::SerializableResource.new(contact).to_json

    render json: contact_serialized, status: 200
  end

  def search
    contacts_paginated = user_contacts.where("full_name LIKE '%#{params[:full_name]}%'").paginate(page: current_page, per_page: CONTACTS_PER_PAGE)

    contacts_serialized = ActiveModelSerializers::SerializableResource.new(contacts_paginated, each_serializer: ContactSerializer).as_json

    total_pages = contacts_paginated&.total_pages || 0

    render json: {results: contacts_serialized, total_pages: total_pages}, status: 200
  end

  def update
    result = Contact::UpdateContactService.perform(params[:id], update_contact_params)

    if result.valid?
      render json: {location: contacts_url, contact: result.contact}, status: 200
    else
      render json: {error: result.errors.first}, status: 422
    end
  end

  def destroy
    Contact.find(params[:id]).delete

    render json: {message: "Deleted contact with success", location: contacts_url }, status: 200
  end

  private

  def create_contact_params
    params.permit(:full_name, :email, :document_number, :birthday_date, phones: %i[number whatsapp])
  end

  def update_contact_params
    params.permit(:full_name, :email, :document_number, :birthday_date, address: %i[street number neighborhood city state zipcode], phones: %i[number whatsapp])
  end

  def current_page
    params[:page] || 1
  end

  def user_contacts
    @user_contacts ||= current_user.contacts
  end
end

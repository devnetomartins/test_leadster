# frozen_string_literal: true

class Contact::CreateContactService < ActiveService::Base
  def initialize(params, user)
    @params = params
    @user = user
  end

  def perform
    contact = create_contact!
    send_contact_to_webhook(contact)

    response(valid?: true, contact: contact)
  rescue StandardError => e
    message = "#{self.class}, class=#{e.class} message='#{e.message}'"
    Rails.logger.error(message)
    response(errors: [e])
  end

  private

  attr_reader :params, :user

  def create_phones(contact)
    params[:phones].each do |phone|
      contact.phones.build(phone)
    end

    contact.save!
  end

  def create_contact!
    contact = user.contacts.build(params.except(:phones))
    contact.save!
    create_phones(contact)

    contact
  end

  def send_contact_to_webhook(contact)
    SendContactToWebhookWorker.perform_async(contact_id: contact.id)
  end
end

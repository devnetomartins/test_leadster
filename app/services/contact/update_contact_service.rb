# frozen_string_literal: true

class Contact::UpdateContactService < ActiveService::Base
  def initialize(contact_id, params)
    @contact_id = contact_id
    @params = params
  end

  def perform
    result_contact = update_contact!

    response(valid?: true, contact: result_contact)
  rescue StandardError => e
    message = "#{self.class}, class=#{e.class} message='#{e.message}'"
    Rails.logger.error(message)
    response(valid?: false, error: e)
  end

  private

  attr_reader :params, :contact_id

  def contact
    @contact ||= Contact.find(contact_id)
  end

  def create_address!
    address = contact.build_address(params[:address])
    address.save!
  end

  def create_or_update_address
    return create_address! unless contact.address

    address = contact.address
    address.assign_attributes(params[:address])
    address.save!
  end

  def update_phones
    phone_numbers = params[:phones].map { |phone| phone[:number] }
    contact_phones = contact.phones

    contact_phones.each do |contact_phone|
      if phone_numbers.include?(contact_phone.number)
        phone_attributes = params[:phones].select { |phone| phone[:number] == contact_phone.number }.first
        contact_phone.assign_attributes(phone_attributes)

        contact_phone.save!
      else
        contact_phone.delete
      end
    end

    contact_phone_numbers = contact_phones.pluck(:number)

    params[:phones].each do |phone|
      contact.phones.build(phone).save! unless contact_phone_numbers.include?(phone[:number])
    end
  end

  def update_contact!
    contact.assign_attributes(params.except(:phones, :address))
    contact.save!

    create_or_update_address
    update_phones

    contact
  end
end

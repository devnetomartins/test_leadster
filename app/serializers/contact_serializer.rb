# frozen_string_literal: true

class ContactSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :document_number, :email, :birthday_date, :phones, :first_phone, :address

  def first_phone
    object.phones.first
  end
end

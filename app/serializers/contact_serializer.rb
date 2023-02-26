# frozen_string_literal: true

class ContactSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :document_number, :email, :birthday_date, :phone

  def phone
    object.phones.first
  end
end

# frozen_string_literal: true

FactoryBot.define do
  factory :contact_phone do
    contact { create(:contact) }
    number { Faker::PhoneNumber.phone_number.tr('^0-9', '') }
    whatsapp { [true, false].sample }
  end
end

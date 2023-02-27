# frozen_string_literal: true

FactoryBot.define do
  factory :contact_phone do
    contact { create(:contact) }
    number { Faker::Internet.email }
    whatsapp { [true, false].sample }
  end
end

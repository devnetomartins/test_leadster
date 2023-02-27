# frozen_string_literal: true

FactoryBot.define do
  factory :contact do
    full_name { Faker::Name.name }
    email { Faker::Internet.email }
    document_number { CPF.generate }
    birthday_date { Date.current }
    user { create(:user) }

    trait :with_phones do
      after(:create) do |contact|
        create(:contact_phone, contact_id: contact.id)
      end
    end

    trait :with_address do
      address { build(:address) }
    end
  end
end

# frozen_string_literal: true

FactoryBot.define do
  factory :address do
    contact { create(:contact) }
    street { Faker::Address.street_name }
    number { Faker::Address.building_number }
    neighborhood { Faker::Address.community }
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    zipcode { Faker::Address.zip_code.tr('^0-9', '') }
  end
end

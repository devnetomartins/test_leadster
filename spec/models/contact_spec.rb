# frozen_string_literal: true

require 'rails_helper'

describe Contact, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:phones) }
    it { is_expected.to have_one(:address) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:full_name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:document_number) }
    it { is_expected.to validate_presence_of(:birthday_date) }
  end
end

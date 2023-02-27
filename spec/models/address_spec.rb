# frozen_string_literal: true

require 'rails_helper'

describe Address, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:contact) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:street) }
    it { is_expected.to validate_presence_of(:neighborhood) }
    it { is_expected.to validate_presence_of(:city) }
    it { is_expected.to validate_presence_of(:state) }
    it { is_expected.to validate_presence_of(:zipcode) }
  end
end

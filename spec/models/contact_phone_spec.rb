# frozen_string_literal: true

require 'rails_helper'

describe ContactPhone, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:contact) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:number) }
  end
end

# frozen_string_literal: true

require 'rails_helper'

describe Contact::CreateContactService do
  describe '.perform' do
    let!(:user) { create(:user) }
    let(:contact) { build(:contact, :with_phones) }
    let(:payload) { params_from_json('contact/newContact') }
    let(:result) { subject }
    subject { described_class.perform(payload, user) }

    context 'when success' do
      before { expect(SendContactToWebhookWorker).to receive(:perform_async).and_return(nil) }

      it { expect(result.valid?).to be true }

      it { expect(result.contact).not_to be nil }
    end
  end
end

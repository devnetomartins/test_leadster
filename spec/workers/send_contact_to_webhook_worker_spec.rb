# frozen_string_literal: true

require 'rails_helper'

describe SendContactToWebhookWorker do
  describe '.perform' do
    let(:contact) { create(:contact, :with_phones) }
    let(:params) { {contact_id: contact.id} }
    subject { described_class.new.perform(params) }

    context 'when success' do
      before { expect(WebhookIntegration::Contact::SendContactService).to receive(:perform).with(payload).and_return(nil) }
      it { subject }
    end

    def payload
      contact_attributes = contact.as_json(only: [:id, :full_name, :email])

      contact_attributes[:phone] = contact.phones.first.number

      contact_attributes
    end
  end
end

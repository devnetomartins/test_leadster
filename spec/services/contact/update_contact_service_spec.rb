# frozen_string_literal: true

require 'rails_helper'

describe Contact::UpdateContactService do
  describe '.perform' do
    let(:payload) { params_from_json('contact/updateContact') }
    let(:result) { subject }
    subject { described_class.perform(contact.id, payload) }

    context 'when success' do
      context "when the contact doesn't have an address" do
        let(:contact) { create(:contact, :with_phones) }

        it "return contact with address" do
          expect(result.contact.address).not_to be nil
        end
      end

      context 'when the contact has an address' do
        let(:contact) { create(:contact, :with_phones, :with_address) }

        it "return contact with address updated" do
          old_address = contact.address.as_json(only: [:street, :neighborhood, :state, :city, :number, :zipcode])
          expect(old_address).not_to eq(result.contact.address.as_json(only: [:street, :neighborhood, :state, :city, :number, :zipcode]))
        end
      end

      context 'when contact phone whatsapp is changed' do
        let(:contact) { create(:contact, :with_phones, :with_address) }
        let(:payload_phone_number) { payload[:phones].first[:number] }
        before { contact.phones.first.update(number: payload_phone_number, whatsapp: false) }

        it "return contact with phone updated whatsapp" do
          old_contact_phone = contact.phones.first

          expect(old_contact_phone.whatsapp).not_to eq(result.contact.phones.first.whatsapp)
        end
      end

      context 'when removed one phone' do
        let(:contact) { create(:contact, :with_phones, :with_address) }

        it "return other phone number associate contact" do
          old_contact_phone = contact.phones.first
          expect(old_contact_phone.as_json(only: [:number, :whatsapp])).not_to eq(result.contact.phones.first.as_json(only: [:number, :whatsapp]))
        end
      end

      context 'when added other phone' do
        let(:contact) { create(:contact, :with_phones, :with_address) }
        let(:contact_phone) { contact.phones.first }

        before { payload[:phones] << { number: contact_phone.number, whatsapp: contact_phone.whatsapp } }

        it "must return more than 1 associated phone" do
          expect(contact.phones.count).to eq(1)
          expect(result.contact.phones.count).to eq(2)
        end
      end
    end
  end
end

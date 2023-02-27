class SendContactToWebhookWorker
  include Sidekiq::Worker

  sidekiq_options queue: :critical, dead: false

  def perform(params)
    @params = params.deep_symbolize_keys

    send_contact
  end

  private

  attr_reader :params

  def contact
    @contact ||= Contact.find(params[:contact_id])
  end

  def payload
    contact_attributes = contact.as_json(only: [:id, :full_name, :email])

    contact_attributes[:phone] = contact.phones.first.number

    contact_attributes
  end

  def send_contact
    WebhookIntegration::Contact::SendContactService.perform(payload)
  end
end

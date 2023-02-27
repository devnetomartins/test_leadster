# frozen_string_literal: true

module WebhookIntegration::Contact
  class SendContactServiceError < StandardError; end

  class SendContactService < ActiveService::Base
    WEBHOOK_URL = ENV['WEBHOOK_URL']
    WEBHOOK_API_KEY = ENV['WEBHOOK_API_KEY']

    def initialize(payload)
      @payload = payload
    end

    def perform
      failure unless request&.code == 200

      response(valid?: true, response: data)
    end

    private

    attr_reader :payload

    def data
      body = request.body
      return {} if request.body.empty?

      @data ||= JSON.parse(body, symbolize_names: true)
    end

    def request
      @request ||= Typhoeus.post(url, options)
    end

    def url
      "#{WEBHOOK_URL}/#{WEBHOOK_API_KEY}"
    end

    def options
      {
        headers: headers,
        body: payload.to_json,
        cache: false
      }
    end

    def headers
      {
        'accept' => 'application/json',
        'content-type' => 'application/json'
      }
    end

    def failure
      if request.timed_out?
        Rails.logger.info("[#{self.class}] Timeout in communication with the hamster")
        raise Timeout::Error
      end

      Rails.logger.warn("Error in communication with the webhook")
      raise SendContactServiceError
    end
  end
end

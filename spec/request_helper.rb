# frozen_string_literal: true

module RequestHelper
  module JsonHelpers
    def params_from_json(path, options = {})
      hash = JSON.parse(file_fixture("#{path}.json").read).deep_symbolize_keys
      options.map { |k, v| hash[k.to_sym] = v } if options.present?
      hash
    end
  end
end

# frozen_string_literal: true
require "database_cleaner"

module DatabaseCleaner
  def self.configure(config)
    config.before(:suite) do
      DatabaseCleaner.start
      DatabaseCleaner.strategy = :transaction
      DatabaseCleaner.clean
    end

    config.after(:each) do
      DatabaseCleaner.clean
    end

    config.after(:suite) do
      DatabaseCleaner.clean
    end
  end
end

class ContactPhone < ApplicationRecord
  belongs_to :contact

  validates :number, presence: true
end

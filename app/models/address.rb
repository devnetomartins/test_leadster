class Address < ApplicationRecord
  belongs_to :contact

  validates :street, :neighborhood, :city, :state, :zipcode, presence: true
end

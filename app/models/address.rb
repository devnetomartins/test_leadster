class Address < ApplicationRecord
  belongs_to :contact

  validates :street, :number, :neighborhood, :city, :state, :zipcode, presence: true
end

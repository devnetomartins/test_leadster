class Contact < ApplicationRecord
  belongs_to :user
  has_many :phones, foreign_key: 'contact_id', class_name: 'ContactPhone', dependent: :delete_all
  has_one :address

  validates :full_name, :email, :document_number, :birthday_date, presence: true
end

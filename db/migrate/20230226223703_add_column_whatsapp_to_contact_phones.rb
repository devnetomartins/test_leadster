class AddColumnWhatsappToContactPhones < ActiveRecord::Migration[7.0]
  def change
    add_column :contact_phones, :whatsapp, :boolean
  end
end

class CreateContactPhones < ActiveRecord::Migration[7.0]
  def change
    create_table :contact_phones do |t|
      t.string :number
      t.references :contact, null: false, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end

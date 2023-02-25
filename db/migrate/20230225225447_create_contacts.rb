class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :full_name
      t.string :document_number
      t.string :email
      t.date :birthday_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

import { Controller } from "@hotwired/stimulus"
import ListContacts from "../../components/contacts/ListContacts"
import React from "react"
import ReactDOM from "react-dom/client"

export default class extends Controller {
  connect() {
    const contactsSerialized = document.getElementById("contacts").dataset.contacts
    const totalPages = document.getElementById("total-pages").dataset.totalPages
    const userEmail = document.getElementById("user-email").dataset.userEmail
    const contacts = JSON.parse(contactsSerialized)

    const root = ReactDOM.createRoot(document.getElementById("app"))

    root.render(
      <ListContacts userEmail={userEmail} totalPages={totalPages} contacts={contacts} />,
    )
  }
}

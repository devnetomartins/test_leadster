import { Controller } from "@hotwired/stimulus"
import ListContacts from "../../components/contacts/ListContacts"
import React from "react"
import ReactDOM from "react-dom/client"

export default class extends Controller {
  connect() {
    const contactsSerialized = document.getElementById("contacts").dataset.contacts
    const contacts = JSON.parse(contactsSerialized)

    const root = ReactDOM.createRoot(document.getElementById("app"))

    root.render(
      <ListContacts contacts={contacts} />,
    )
  }
}
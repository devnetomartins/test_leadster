import { Controller } from "@hotwired/stimulus"
import LoginComponent from "../../components/login"
import React from "react"
import ReactDOM from "react-dom/client"

export default class extends Controller {
  connect() {
    const root = ReactDOM.createRoot(document.getElementById("app"))

    root.render(
      <LoginComponent /> 
    )
  }
}

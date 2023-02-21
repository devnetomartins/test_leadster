import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("connected with controller")
    this.element.textContent = "Hello World!"
  }
}

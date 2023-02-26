import { application } from "./application"

import LoginIndexController from "./login/index_controller"
import ContactsIndexController from "./contacts/index_controller"

application.register("login-index", LoginIndexController)
application.register("contacts-index", ContactsIndexController)

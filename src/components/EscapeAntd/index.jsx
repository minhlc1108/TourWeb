import {
  message as antdMessage,
  notification as antdNotification,
  Modal as antdModal,
  App
} from "antd"

let message = antdMessage
let notification = antdNotification

// because warn is deprecated, so we need to remove it.
const { warn, ...resetFns } = antdModal
let modal = resetFns

/**
 * This component is used to escape the antd's static functions.
 */
function EscapeAntd() {
  const staticFunctions = App.useApp()

  message = staticFunctions.message
  notification = staticFunctions.notification
  modal = staticFunctions.modal

  return null
}

export { message, notification, modal }

export default EscapeAntd

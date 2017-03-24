
const accountService = require('../services/authManagement/notifier')

module.exports = options => hook => {
  if (!hook.params.provider) { return hook; }
  const user = hook.result
  if( hook.data && hook.data.email && user) { //process.env.GMAIL &&
    accountService(hook.app).notifier('resendVerifySignup', user)
    return hook
  }
  return hook
}

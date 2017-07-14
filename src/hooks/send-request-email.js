
const accountService = require('../services/authManagement/authManagement.notifier')

module.exports = options => hook => {
  if (!hook.params.provider) { return hook; }
  const request = hook.result
  if( hook.data  && request) { 
    accountService(hook.app)('sendRequestMail', request, hook.app.get('approvalEmails'))
    return hook
  }
  return hook
}

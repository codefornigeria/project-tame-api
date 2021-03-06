const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const returnEmail = process.env.COMPLAINT_EMAIL
const jade = require('jade')

module.exports = function (app) {
  console.log('the app', app)
  console.log('showing notifier app value', app.get('src'))
  const returnEmail = app.get('complaint_email') || process.env.COMPLAINT_EMAIL

  function getLink(type, hash) {
    var url
    var port = (app.get('client_port') === '80' || isProd) ? '' : ':' + app.get('client_port')
    var host = (app.get('host') === 'HOST') ? 'localhost' : app.get('host')
    var protocal = (app.get('protocal') === 'PROTOCAL') ? 'http' : app.get('protocal')
    console.log('show', protocal);
    protocal += "://"
    console.log('spell', protocal);
    var accessLink = `http://tame-app.herokuapp.com/#!/${type}?token=${hash}`
    console.log('showing link sent to user', accessLink)
    return accessLink
  }

  function sendEmail(email) {
    return app.service('email').create(email).then(function (result) {
      console.log('Sent email', result)
    }).catch(err => {
      console.log('Error sending email', err)
    })
  }

  return function (type, user, notifierOptions) {
    console.log(`-- Preparing email for ${type}`)

    var hashLink
    var email
    console.log('src path', app.get('src'))
    var emailAccountTemplatesPath = path.join(app.get('src'), 'email-templates', 'account')

    var templatePath
    var compiledHTML
    switch (type) {
      case 'resendVerifySignup': // send another email with link for verifying user's email addr

        hashLink = getLink('verify', user.verifyToken)

        templatePath = path.join(emailAccountTemplatesPath, 'verify-email.jade')

        compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        })

        email = {
          from: 'hello@mail.tamecorruption.org',
          to: user.email,
          subject: 'Confirm Signup',
          html: compiledHTML
        }

        return sendEmail(email)

        break
      case 'sendRequestMail':
      console.log('showing request user', user)
        templatePath = path.join(emailAccountTemplatesPath, 'send-request.jade')
        adminTemplatePath = path.join(emailAccountTemplatesPath, 'send-request-admin.jade')
         acceptLink = `http://tame-app.herokuapp.com/#!/request?action=accept&requestId=${user._id}`
         rejectLink = `http://tame-app.herokuapp.com/#!/request?action=reject&requestId=${user._id}`
        compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          assessorType: user.assessorType,
          returnEmail
        })

        compiledAdminHTML = jade.compileFile(adminTemplatePath)({
          logo: '',
          name: user.user[0].firstname || user.user[0].email,
          acceptLink,
          rejectLink,
          returnEmail
        })

        email = {
          from: 'hello@mail.tamecorruption.org',
          to: user.user[0].email,
          subject: 'Confirm Signup',
          html: compiledHTML
        }
         adminEmail = {
          from: 'hello@mail.tamecorruption.org',
          to: notifierOptions.emails,
          subject: 'New Assessor Request',
          html: compiledAdminHTML
        }
       sendEmail(email)
       return sendEmail(adminEmail)

        break
      case 'sendRequestConfirmMail':
        templatePath = path.join(emailAccountTemplatesPath, 'send-request.jade')
        var rejectString = `Unfortunately your request to become  ${user.assessorType} assessor was rejected`;
        var acceptString = `Your request to become ${user.assessorType}  was successful`
        adminTemplatePath = path.join(emailAccountTemplatesPath, 'send-request-admin.jade')
            compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          assessorType: user.assessorType,
          approvalString: user.approved? acceptString : rejectString,
          returnEmail
        })

        compiledAdminHTML = jade.compileFile(adminTemplatePath)({
          logo: '',
          name: user.user[0].firstname || user.user[0].email,
          approval : user.approved? 'Accepted': 'Rejected',
          assessorType: user.assessorType,
          returnEmail
        })

        email = {
          from: 'request@mail.tamecorruption.org',
          to: user.user[0].email,
          subject: 'Confirm Signup',
          html: compiledHTML
        }
         adminEmail = {
          from: 'request@mail.tamecorruption.org',
          to: notifierOptions.emails,
          subject: 'New Assessor Request',
          html: compiledAdminHTML
        }
       sendEmail(email)
       return sendEmail(adminEmail)

        break

      case 'verifySignup': // inform that user's email is now confirmed

        hashLink = getLink('verify', user.verifyToken)

        templatePath = path.join(emailAccountTemplatesPath, 'email-verified.jade')

        compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        })

        email = {
          from: 'hello@mail.tamecorruption.org',
          to: user.email,
          subject: 'Thank you, your email has been verified',
          html: compiledHTML
        }

        return sendEmail(email)

        break
      case 'sendResetPwd': // inform that user's email is now confirmed

        hashLink = getLink('forgotpassword', user.resetToken)

        templatePath = path.join(emailAccountTemplatesPath, 'reset-password.jade')

        compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        })

        email = {
          from: 'hello@mail.tamecorruption.org',
          to: user.email,
          subject: 'Reset Password',
          html: compiledHTML
        }

        return sendEmail(email)

        break
      case 'resetPwd': // inform that user's email is now confirmed

        hashLink = getLink('forgotpassword', user.resetToken)

        templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.jade')

        compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        })

        email = {
          from: 'hello@mail.tamecorruption.org',
          to: user.email,
          subject: 'Your password was reset',
          html: compiledHTML
        }

        return sendEmail(email)

        break
      case 'passwordChange':

        templatePath = path.join(emailAccountTemplatesPath, 'password-change.jade')

        compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          returnEmail
        })

        email = {
          from: 'hello@mail.tamecorruption.org',
          to: user.email,
          subject: 'Your password was changed',
          html: compiledHTML
        }

        return sendEmail(email)

        break
      case 'identityChange':
        hashLink = getLink('verifyChanges', user.verifyToken)

        templatePath = path.join(emailAccountTemplatesPath, 'identity-change.jade')

        compiledHTML = jade.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail,
          changes: user.verifyChanges
        })

        email = {
          from: 'hello@mail.tamecorruption.org',
          to: user.email,
          subject: 'Your account was changed. Please verify the changes',
          html: compiledHTML
        }

        return sendEmail(email)
        break
      default:
        break
    }
  }
}

const { postSlackMessage } = require('./util')

const COOL_OFF_PERIOD = 45 * 60 * 1000 // 45 minutes

/*
 * Reports to slack if a service deployment is in waiting state after a period
 * defined in COOL_OFF_PERIOD.
 */
module.exports = {
  name: 'queue-checker',
  command: (deployments) => {
    const NOW = new Date().getTime()

    deployments.forEach(deployment => {
      const serviceDate = deployment.app.version
      if (NOW > serviceDate + COOL_OFF_PERIOD) {
        postSlackMessage(deployment.app.id + ': deployment is stuck.')
      }
    })
  }
}

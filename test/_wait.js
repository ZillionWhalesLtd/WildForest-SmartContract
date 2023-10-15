'use strict'

const util = require('util')
const wait = util.promisify(setTimeout)

module.exports = async(ms) => {
  const timer = await wait(ms)
  clearTimeout(timer)

  return timer
}
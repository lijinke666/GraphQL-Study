const helper = require("./helper")
const url = helper.getUrl("gns")
const PARAMS = require("./config").GNS

module.exports = {
  getTailNumber() {
    return helper.postJSON(url, PARAMS.TAIL_NUMBER())
  },
  setTailNumber(tailNumber) {
    return helper.postJSON(url, PARAMS.TAIL_NUMBER(tailNumber))
  }
}
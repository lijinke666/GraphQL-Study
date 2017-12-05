const fetch = require("node-fetch")
const stringify = require("querystring").stringify
const config = require("../const/config")
const debug = require("debug")("ifs2.hwAPI.fetching")
const API_RESULT = {
  SUCCESS: "success"
}

const helper = {
  async fetch({
    url,
    headers,
    method,
    body,
    query

  }) {
    let queryString = `?${typeof query === "string" ? query : stringify(query)}`
    let res = await fetch(url + queryString, {
      method,
      body,
      headers
    })
    let text = await res.text()
    return text
  },
  async fetchJSON(args) {
    let ret = null
    try {
      ret = JSON.parse(await helper.fetch(args))
    } catch (e) {
      throw utils.error(ERROR.HW_API_NETWORK, e.message)
    }
    if (ret.result.code === API_RESULT.SUCCESS) {
      return ret.data
    } else {
      throw utils.error(ERROR.HW_API_FAIL, ret.result.message)
    }
  },
  async getJSON(url, query) {
    return await helper.fetchJSON({
      url,
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      },
      query,
      method: "GET"
    })
  },
  async get(url, query) {
    return await helper.fetch({
      url,
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      },
      query,
      method: "GET"
    })
  },
  async postJSON(url, body) {
    return await helper.fetchJSON({
      url,
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      },
      method: "POST",
      body
    })
  },
  getUrl(type, index) {
    let endpoint = config.HW.ENDPOINTS[type.toUpperCase()]
    if (endpoint instanceof Array) {
      endpoint = endpoint[index]
    }
    if (!endpoint) {
      throw new Error(`Unknow hardware type:${type} ${typeof index === "number" ? index : ""}`)
    }
    return `http://${endpoint.IP}:${endpoint.PORT}${config.HW.PATH}`
  }
}
module.exports = helper
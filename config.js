function build(
  formname,
  action,
  argument = "noargument"
) {
  return `formname:${formname}&action:${action}&argument:${argument}`
}

function tailNumberBuild(tailNumber) {
  return build(
    "tail_number",
    tailNumber ? "set_value" : "get_value",
    tailNumber ? `tailnumber:${tailNumber}` : undefined
  )
}

const SYSTEM_TYPE = build("system_type", "get_value")
const SYSTEM_VERSION = build("system_upgrate", "get_value")

module.exports = {
  TWCU: {
    SYSTEM_TYPE,
    LOG_SIZE: "download_bitinfo",
    SYSTEM_VERSION
  },
  CWAP: {
    SYSTEM_TYPE,
    SYSTEM_VERSION
  },
  GNS: {
    SYSTEM_VERSION,
    TAIL_NUMBER(tailNumber) {
      return tailNumberBuild(tailNumber)
    }
  }
}
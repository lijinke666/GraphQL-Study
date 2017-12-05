const gns = require("./gns")
module.exports = {
  Query: {
    async tailNumber(obj, data, {
      loaders
    }) {
      return {
        id: "test",
        number: (await gns.getTailNumber()).tailnumber
      }
    }
  },

}
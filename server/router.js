/**
 * @Author: Ali
 * @Date:   2019-10-04T10:29:14+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-10-04T10:54:09+02:00
 */
//we create router to pass it as middleware in index.js with app.use()
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("server is up and running");
});
module.exports = router;

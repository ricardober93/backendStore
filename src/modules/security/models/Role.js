const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, dropDups: true },
  permissions: [{ type: String, required: true }]
})

const Role = mongoose.model('role', roleSchema);

module.exports = Role;
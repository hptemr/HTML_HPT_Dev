var mongoose = require( 'mongoose' )

var emailTemplateSchema = new mongoose.Schema({
  type: String,
  code: String,
  title: String,
  mail_subject: String,
  mail_body: String,
  status: String,
  created_on: Date,
  modified_on: Date
})
emailTemplateSchema.index({ code: 1, title: 1, mail_subject: 1, mail_body: 1 })
module.exports = mongoose.model('email_templates', emailTemplateSchema)

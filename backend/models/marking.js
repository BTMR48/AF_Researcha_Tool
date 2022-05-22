const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MarkingSchema = new Schema({
  progress_name: {
    type: String,
    required: true
  },

  submission_doc: {
    type: String,
    required: true
  }
});

const Marking = mongoose.model("markingSchema", MarkingSchema)
module.exports = Marking

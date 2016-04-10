var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    title: String,
    body: String,
    color: { type: String, default: "white" },
    archive: { type: Boolean, default: false },
    reminder: { type: Date, default: null },
    timecreated: Date,
    timeedited: { type: Date, default: null },
    author: String
});

/*
post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
*/

/*
PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
*/
mongoose.model('Note', NoteSchema);


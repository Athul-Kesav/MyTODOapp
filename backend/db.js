const todoSchema = new mongoose.Schema({
    username: String,
    id: String,
    title: String,
    description: String,
    status: String,
});

const TODO = mongoose.model('TODO', todoSchema);

module.exports = {
    TODO
}
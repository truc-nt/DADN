const mongoose = require('mongoose');

/*mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('err', err);
    });*/

class Database {
    constructor() {
        if (!Database.instance) {
            mongoose
                .connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                .then(() => {
                    console.log('Connected to DB');
                })
                .catch((err) => {
                    console.log('err', err);
                });
            this.connection = mongoose.connection;
            Database.instance = this;
        }
        return Database.instance;
    }

    getModel(name, schema) {
        return mongoose.model(name, schema);
    }
}

module.exports = Database;

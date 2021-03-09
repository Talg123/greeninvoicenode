const express = require('express');
const app = express();
const { sequelize } = require('./db.js');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.drop();
        await sequelize.sync();
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
    app.use(express.json());

    app.use('/', routes);

    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
})();
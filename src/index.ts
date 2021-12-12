import express from 'express';

import loaders from './loaders';

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = () => {
    loaders(app);
    app.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`server started at http://localhost:${PORT}`);
    });
};

startServer();

export default app; // For mocha tests

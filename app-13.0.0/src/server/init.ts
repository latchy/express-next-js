/* TS DOCUMENT */

'use strict';

import next from 'next';
import express from 'express';
import conf from '../client/next.config';

const HOST = 'localhost';
const PORT = 3003;
const DEV = true;

(async () => {
    try {
        const server = express();
        const nextjs = next({
            conf,
            dir: `${__dirname}/../client`,
            dev: DEV,
            quiet: !DEV,
            port: PORT,
        });

        await nextjs.prepare();
        const handle = nextjs.getRequestHandler();

        // serve all static files from the /public folder
        server.use(express.static(`${__dirname}/../public/`));

        // logging middleware
        server.use((req, res, next) => {
            const start = Date.now();
            const endpoint = `${req.baseUrl}${req.path}`;

            // only apply logging to /_next routes
            if (endpoint.indexOf('_next') < 0) {

                // log incoming request
                console.log(`\n>> [${new Date().toISOString()}] REQ: ${req.method} ${endpoint} ... `);

                res.on('close', () => {
                    const end = Date.now();
                    const took = end - start;

                    // log outgoing response
                    console.log(`>> [${new Date().toISOString()}] RES: ${res.statusCode} (took ${took}ms) >> ${req.method} ${endpoint}`);
                });
            }

            // continue with request
            next();
        })

        // home page
        server.get('/', (req: any, res: any) => {
            nextjs.render(req, res, '/');
        });

        // about page
        server.get('/about', (req: any, res: any) => {
            nextjs.render(req, res, '/about');
        });

        // contact page
        server.get('/contact', (req: any, res: any) => {
            nextjs.render(req, res, '/contact');
        });

        // allow NextJS to add handler to all remaining routes
        server.use('*', (req, res) => {
            return handle(req, res);
        });

        // start server
        server.listen(PORT, () => {
            console.log(`Server listening on port http://${HOST}:${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
})()

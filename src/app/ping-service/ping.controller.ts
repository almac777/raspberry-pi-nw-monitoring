import {tokens} from 'typed-inject';
import express = require('express');

export class PingController {

    public static inject = tokens('app');
    constructor(private app: express.Application) {
        // app.get("/", (req, res) => {
        //     return res.send(this.something(req));
        // });
    }

}

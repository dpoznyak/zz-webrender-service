import { Router } from 'express'
//import {htmlConvert} from 'html-convert'

var htmlConvert = require('html-convert');

var convert = htmlConvert();

var http = require('http');
var fs = require('fs');


const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

router.get('/render', function (req, res) {
    var url = req.query.url;
    if (url) {
        var converted = convert(url);

        converted.on("error", function (e) {
            res.status(500).send(e.toString());

        });
        converted.pipe(res);
    }
    else
        res.sendStatus(400);
});

router.get('/test-dl', function (req, res) {
    var url = req.query.url;
    if (url) {
        var file = fs.createWriteStream(process.env.TEMP + "/file.jpg");
        var request = http.get(url, function (response) {
            response.pipe(file);
        });
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);

});

export default router

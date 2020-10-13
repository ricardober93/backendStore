import dotenv from 'dotenv';
import {
    logRequest
} from '../../logger/logger';
import client from "@mailchimp/mailchimp_marketing";

module.exports.pinAction = async function (req, res) {

    logRequest(req)

    client.setConfig({
        apiKey: process.env.MAIL_CHAMPI_APIKEY,
        server: process.env.CHAMPI_SERVER,
    });

    const response = await client.lists.addListMember("2b139f811c", {
        email_address: "Prueba46@gmail.com",
        status: "subscribed",
    });
    console.log(response);

    return res.send(response)

}
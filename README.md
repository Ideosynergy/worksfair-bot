# worksfair-bot

Worksfair whatsapp and messenger bot microservice.
This service hooks up with the worksfair backend to enable searching for businesses and services through whatsapp and/or messenger.


## Getting Started

Pull this repo, then run

```bash
yarn
```
Add the `.env` file to the root of the app.

Start the app by running

```bash
yarn dev
```
A webhook is required to be able to run the app locally and to be connected to the Whatsapp API. To get the `ngrok` webhook url, run:

```bash
yarn start:live:dev
```
Example of the webhook URL: `https://e37a5c17.ngrok.io/api/v1/receiver`

## System Architecture

[Link to the Diagram](https://www.draw.io/?state=%7B%22ids%22:%5B%221A7zN5K_GDWMpe4Xngu_cKie9GjP7Tyuy%22%5D,%22action%22:%22open%22,%22userId%22:%22{userId}%22%7D#G16BwSOkAJ_Q9f-c0NcSkcTQZYdfVdwm2m)

<img width="950" alt="Screenshot 2019-08-26 at 3 36 05 PM" src="https://user-images.githubusercontent.com/31534129/63694678-44778f80-c817-11e9-9c1f-e55bfe2eface.png">


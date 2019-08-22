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


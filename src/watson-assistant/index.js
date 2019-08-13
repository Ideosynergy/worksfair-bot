/* eslint-disable camelcase */
import dotenv from 'dotenv';

const AssistantV2 = require('ibm-watson/assistant/v2');

dotenv.config();

const {
  WATSON_url,
  WATSON_apikey,
  WATSON_api_version,
} = process.env;

const assistant = new AssistantV2({
  version: WATSON_api_version,
  iam_apikey: WATSON_apikey,
  url: WATSON_url,
});

export default assistant;

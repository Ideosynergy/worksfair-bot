/* eslint-disable camelcase */
import dotenv from 'dotenv';

import assistant from '../watson-assistant';

import { worksfair_search } from '../watson-assistant/intents';
import { searchWorksfair, getBusiness } from '../worksfair-backend';
import extractSearchTerms from '../utils/input-handlers';
import {
  formatSearchResultMessage,
  formatMoreDetailsMessage
} from '../message-formatter';
import { getMatchingEntities } from '../utils/helpers';

dotenv.config();

const {
  WATSON_assistant_id,
} = process.env;

let sessionId;

assistant.createSession({
  assistant_id: WATSON_assistant_id,
})
  .then((response) => {
    sessionId = response.session_id;
  })
  .catch((error) => {
    console.log(error);
  });

const messageReceiver = (request, response) => {
  let { messageobj } = request.body;
  messageobj = JSON.parse(messageobj);
  const message = messageobj.text;
  console.log('Message Object', messageobj);

  // Send the message to Watson-Assistant
  assistant.message({
    assistant_id: WATSON_assistant_id,
    session_id: sessionId,
    input: {
      message_type: 'text',
      text: message,
    },
  })
    .then(async (res) => {
      const { generic, intents, entities } = res.output;
      const numberEntities = getMatchingEntities(entities, 'sys-number');
      console.log(res.output);
      if (intents[0] && intents[0].intent === worksfair_search) {
        const searchTerms = extractSearchTerms(message);

        // make the search API request to worksfair
        const searchResults = await searchWorksfair(searchTerms);

        // Formats the SearchResults to a WhatsApp message
        const resultMessage = formatSearchResultMessage(searchResults);
        response.status(200).send(resultMessage);
      } else if (numberEntities[0]) {
        // make the API request to worksfair to get specific business
        const business = await getBusiness(entities[0].value);

        // Formats the response to Whatsapp message
        const moreDetailsMessage = formatMoreDetailsMessage(business);
        return response.status(200).send(moreDetailsMessage);
      } else {
        return response.status(200).send(generic[0].text);
      }
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).send('Hi, something went wrong. Please inform Theo: +2348136064066 about this and try again.');
    });
};

export default messageReceiver;

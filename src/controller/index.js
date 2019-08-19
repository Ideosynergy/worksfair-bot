/* eslint-disable camelcase */
import dotenv from 'dotenv';

import assistant from '../watson-assistant';

import { worksfair_search } from '../watson-assistant/intents';
import searchWorksfair from '../worksfair-backend';
import extractSearchTerms from '../utils/input-handlers';
import formatResultMessage from '../message-formatter';

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
  //   console.log(messageobj);
  assistant.message({
    assistant_id: WATSON_assistant_id,
    session_id: sessionId,
    input: {
      message_type: 'text',
      text: message,
    },
  })
    .then(async (res) => {
      const { generic, intents } = res.output;
      console.log(res.output);
      if (intents[0] && intents[0].intent === worksfair_search) {
        const searchTerms = extractSearchTerms(message);
        const searchResults = await searchWorksfair(searchTerms);
        const resultMessage = formatResultMessage(searchResults);
        response.status(200).send(resultMessage);
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

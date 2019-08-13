import dotenv from 'dotenv';

import assistant from '../watson-assistant';

dotenv.config();

const {
  // eslint-disable-next-line camelcase
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
  const { messageobj } = request.body;
  const message = JSON.parse(messageobj).text;
  console.log(message);
  assistant.message({
    assistant_id: WATSON_assistant_id,
    session_id: sessionId,
    input: {
      message_type: 'text',
      text: message,
    },
  })
    .then((res) => {
    //   console.log(res.output);
      return response.status(200).send(res.output.generic[0].text);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).send('Hi, something went wrong. Please send a message to +2348136064066');
    });
};

export default messageReceiver;

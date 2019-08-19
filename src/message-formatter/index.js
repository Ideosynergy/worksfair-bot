/* eslint-disable camelcase */
const searchMessageFormatter = (results) => {
  let message = '🔎 WORKSFAIR SEARCH RESULTS';
  const info = 'Not available yet';

  console.log('here', results);
  if (results && results.length > 0) {
    results.map((result, index) => {
      const {
        title,
        description,
        address,
        city,
        state,
        sub_domain_name,
      } = result;

      const serialNumber = index + 1;
      const location = address
        ? `${address}, ${city}, ${state}` : info;

      const code = index;
      const resultFormat = `

*${serialNumber})  ${title}*
_${description}_
📍${location}
🌐 http://${sub_domain_name}.worksfair.com
(Type *${code}* for more details)`;

      message += resultFormat;
      return message;
    });
  } else {
    message += `
    
_No results found._

You can try broader search terms (for instance, instead of town, use state).
Also inform your friends to add their business on www.worksfair.com`;
  }
  return message;
};

export default searchMessageFormatter;

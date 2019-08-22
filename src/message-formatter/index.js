/* eslint-disable camelcase */
export const formatSearchResultMessage = (results) => {
  let message = '🔎 WORKSFAIR SEARCH RESULTS';
  const info = 'Not available yet';

  if (results && results.length > 0) {
    results.map((result, index) => {
      const {
        id,
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

      const resultFormat = `

*${serialNumber})  ${title}*
_${description}_
📍${location}
🌐 http://${sub_domain_name}.worksfair.com
(Type *${id}* for more details)`;

      message += resultFormat;
      return message;
    });
  } else {
    message += `
    
_No results found._

You can try broader search terms (for instance, instead of town, use state).
Also inform your friends to add their works on www.worksfair.com`;
  }
  return message;
};

export const formatMoreDetailsMessage = (result) => {
  let message = '';
  const info = 'Not available yet';

  if (result) {
    const {
      title,
      description,
      address,
      city,
      state,
      sub_domain_name,
      phone,
      offerings,
    } = result;

    const location = address
      ? `${address}, ${city}, ${state}` : info;
    let products = '';
    if (offerings.length > 0) {
      offerings.map((elem, index) => {
        const serialNumber = index + 1;
        // eslint-disable-next-line eqeqeq
        const price = elem.price == 0
          ? '```Contact for Price```'
          : `₦${new Intl.NumberFormat().format(elem.price)}`;

        products += `
*${serialNumber})  ${elem.title}*
_Description:_ ${elem.description}
_Picture:_       ${elem.image}
_Price:_        ${price}
`;
        return products;
      });
    } else {
      products = info;
    }

    message = `
*${title}*
_${description}_
📍${location}
🌐 http://${sub_domain_name}.worksfair.com
📞 ${phone || info}


*PRODUCTS/SERVICES*
  ${products}`;
  } else {
    message += `
    
_Result not found._

Ensure that you entered the correct ID.
Also inform your friends to add their works on www.worksfair.com`;
  }
  return message;
};

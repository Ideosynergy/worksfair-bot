import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const {
  WORKSFAIR_API,
} = process.env;

let type;
const SEARCH_FAILED = 'SEARCH_FAILED';
let results;

const searchWorksfair = async (searchTerms) => {
  const url = `${WORKSFAIR_API}/search?query=${searchTerms[0]}&location=${searchTerms[1]}`;
  await fetch(url).then((res) => {
    if (!res.ok) {
      type = SEARCH_FAILED;
    }
    return res.json();
  })
    .then((response) => {
      if (type === SEARCH_FAILED) {
        console.log(response, type);
      } else {
        results = response;
        return response;
      }
    })
    .catch((error) => console.error('Search Error:', error));
  return results;
};

export default searchWorksfair;

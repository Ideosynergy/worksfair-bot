import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const {
  WORKSFAIR_API,
} = process.env;

let type;
const SEARCH_FAILED = 'SEARCH_FAILED';
let results;
const FETCH_BUSINESS_FAILED = 'FETCH_BUSINESS_FAILED';
let result;

export const searchWorksfair = async (searchTerms) => {
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

export const getBusiness = async (pageId) => {
  const url = `${WORKSFAIR_API}/webpages/${pageId}/retrieve`;
  await fetch(url).then((res) => {
    if (!res.ok) {
      type = FETCH_BUSINESS_FAILED;
    }
    return res.json();
  })
    .then((response) => {
      if (type === FETCH_BUSINESS_FAILED) {
        console.log(response, type);
      } else {
        result = response;
        return response;
      }
    })
    .catch((error) => console.error('Fetch business Error:', error));
  return result;
};

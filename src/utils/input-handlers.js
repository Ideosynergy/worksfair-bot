/**
 * @description extracts search terms from a string
 * the text must be in the format "Eg. find shoe maker in Aba"
 * or "Eg. welder in onitsha"
 * @param { String } text
 *
 * @returns { Array } an array of the search terms
 */
const extractSearchTerms = (text) => {
  let textArray;
  if (text.toLocaleLowerCase().includes('find')) {
    const newText = text.substring(5, text.length);
    textArray = newText.split(' in ');
  } else {
    textArray = text.split(' in ');
  }
  return textArray;
};

export default extractSearchTerms;

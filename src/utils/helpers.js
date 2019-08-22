/* eslint-disable import/prefer-default-export */

export const getMatchingEntities = (entitiesArray, entityName) => {
  const matchingEntities = entitiesArray
    .filter((element) => element.entity === entityName);
  return matchingEntities;
};

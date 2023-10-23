// Filters out game deals from different stores with the same title
export default function filterRepeatDeals(dealArray, responseNumTarget = 60) {
  if (!dealArray || dealArray.length === 0) return [];

  const response = {};
  let responseNum = 0;

  for (let i = 0; i < dealArray.length; i++) {
    // Detects repeats
    if (dealArray[i].title in response) {
      // Uses cheaper deal in the response
      if (
        parseFloat(response[dealArray[i].title].salePrice) >
        parseFloat(dealArray[i].salePrice)
      ) {
        response[dealArray[i].title] = dealArray[i];
      }
      continue;
    }
    response[dealArray[i].title] = dealArray[i];

    responseNum++;
    if (responseNum === responseNumTarget) break;
  }

  return Object.values(response);
}

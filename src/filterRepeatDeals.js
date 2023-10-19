// Filters out game deals from different stores with the same title
export default function filterRepeatDeals(dealArray, responseNumTarget = 5) {
  if (!dealArray || dealArray.length === 0) return [];

  const titles = [];
  const response = [];
  let responseNum = 0;

  for (let i = 0; i < dealArray.length; i++) {
    if (titles.includes(dealArray[i].title)) continue;

    titles.push(dealArray[i].title);
    response.push(dealArray[i]);

    responseNum++;
    if (responseNum === responseNumTarget) break;
  }
  return response;
}

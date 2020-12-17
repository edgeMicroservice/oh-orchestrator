const rp = require('request-promise');

const fetchActiveAgreements = (containerPort, correlationId) => rp({
  uri: `http://localhost:${containerPort}/agreement`,
})
  .then((response) => {
    let parsedResponse = {};

    try {
      parsedResponse = JSON.parse(response);
    }
    catch (e) {
      throw new Error('Error occured while parsing response from Anax');
    }
    // console.log('===> parsedResponse', parsedResponse);
    if (!parsedResponse.agreements) return [];
    return parsedResponse.agreements.active;
  })
  .catch((error) => {
    console.log('===> Error occured while fetching agreements', error);
  });

module.exports = {
  fetchActiveAgreements,
};

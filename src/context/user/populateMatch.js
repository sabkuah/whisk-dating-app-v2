const getMatchedUser = async (userId) => {
  function getData() {
    const apiName = 'WhiskPro';
    const path = `/api/object/User/${id}`;
    const myInit = {
      headers: {},
    };
    return API.get(apiName, path, myInit);
  }

  try {
    const item = await getData();
    console.log('MatchedUser', item);
    return item;
  } catch (e) {
    console.log('Error: ', e);
  }
};

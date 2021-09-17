const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchEndPoint = async () => {
  const promise = await fetch(endPoint);
  const data = await promise.json();
  return data.results;
};

export default fetchEndPoint;

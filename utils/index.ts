export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": "c137a92bfcmsh6ef476c31a8800fp17f36bjsn03b5f5f5c736",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla`, {
    headers: headers
  })
  const result = await response.json()

  return result;
}

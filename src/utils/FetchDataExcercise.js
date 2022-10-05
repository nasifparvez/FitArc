export const excerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e0f2dc5372msh58a1f63256d4d52p18c830jsnd8c99c6c40a2',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const FetchDataExcercise = async (url, options) =>{
    const response = await fetch(url,options);
    const data = await response.json();

    return data;
}
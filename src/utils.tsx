export const convertToDateFormat = (date: Date) => date.toISOString().split('T')[0];

export function generateAPODRequest(
    // date: Date = new Date(), 
    api_key: string,
    start_date: string,
    end_date: string,
    count?: number, 
) {
    const requestUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${start_date}&end_date=${end_date}`;
    console.log(requestUrl);   
    return requestUrl;
}
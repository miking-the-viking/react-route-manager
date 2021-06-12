import axios from 'axios';

export async function getData<T>(getURl: string): Promise<T> {
  const response = await axios.get(getURl);

  return response.data;
}

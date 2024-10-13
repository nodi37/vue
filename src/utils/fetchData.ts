import { objKeysToCamelCase } from "./toCamelCase";

type ErrorResponse = {
  success: false;
  message: string;
};

type SuccesResponse<T> = T & {
  success: true;
};

const fetchData = async <T>(
  url: string
): Promise<ErrorResponse | SuccesResponse<T>> => {
  try {
    const request = await fetch(url);
    const data = await request.json();
    return { success: request.ok, ...objKeysToCamelCase(data) };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error ocurred when fetching the data" };
  }
};

export { fetchData };

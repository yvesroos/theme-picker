import { ColorResponseDTO } from "../types";

class ColorService {
  get = async (query: string): Promise<ColorResponseDTO> => {
    const options = {
      method: "GET",
    };
    const request = new Request(
      import.meta.env.VITE_API_URL + "/colors?q=" + query,
      options
    );
    const response = await fetch(request);
    return response.json();
  };
}

export default new ColorService();

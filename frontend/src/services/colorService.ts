import { ColorResponseDTO } from "../types";

class ColorService {
  previousController?: AbortController;

  get = async (query: string): Promise<ColorResponseDTO> => {
    const options = {
      method: "GET",
    };
    const request = new Request(
      import.meta.env.VITE_API_URL + "/colors?q=" + query,
      options
    );
    if (this.previousController) {
      this.cancelPreviousRequest();
    }
    this.previousController = new AbortController();
    const response = await fetch(request, {
      signal: this.previousController.signal,
    });
    this.previousController = undefined;
    return response.json();
  };

  cancelPreviousRequest = () => {
    this.previousController?.abort();
  };
}

export default new ColorService();

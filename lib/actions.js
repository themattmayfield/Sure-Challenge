import axios from "axios";
const baseUrl = "https://fed-challenge-api.sure.now.sh/api/v1/quotes";

export const CreateQuote = (data) => {
  return axios.post(baseUrl, data);
};

export const UpdateQuote = (id, data) => {
  return axios.put(`${baseUrl}/${id}`, data);
};

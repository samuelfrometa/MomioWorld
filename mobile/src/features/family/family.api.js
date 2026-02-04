import { api } from "../../api/api.js";

export const getTickets = () => api.get("/family/");
export const getTicket = (id) => api.get(`/family/${id}/`);
export const createTicket = (data) => api.post("/family/", data);
export const deleteTicket = (id) => api.delete(`/family/${id}/`);

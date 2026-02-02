import { api } from "../../api/api.js";

export const getTickets = () => api.get("/tickets/");
export const getTicket = (id) => api.get(`/tickets/${id}/`);
export const createTicket = (data) => api.post("/tickets/", data);
export const deleteTicket = (id) => api.delete(`/tickets/${id}/`);

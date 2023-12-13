import axios from "axios";
const http = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

class DataService {
	getClients() {
		return http.get("/clients");
	}
	createClient(data) {
		return http.post("/client", data);
	}
	updateClient(id, data) {
		return http.put(`/client/${id}`, data);
	}
	deleteClient(id) {
		return http.delete(`/client/${id}`);
	}
	getClient(full_name) {
		return http.get(`/client/${full_name}`);
	}

	getProviders() {
		return http.get("/providers");
	}
	createProvider(data) {
		return http.post("/provider", data);
	}
	updateProvider(id, data) {
		return http.put(`/provider/${id}`, data);
	}
	deleteProvider(id) {
		return http.delete(`/provider/${id}`);
	}
	getProvider(id) {
		return http.get(`/provider/${id}`);
	}

	getModels() {
		return http.get("/models");
	}
	createModel(data) {
		return http.post("/model", data);
	}
	updateModel(id, data) {
		return http.put(`/model/${id}`, data);
	}
	deleteModel(id) {
		return http.delete(`/model/${id}`);
	}
	getModel(id) {
		return http.get(`/model/${id}`);
	}

	getPrices() {
		return http.get("/prices");
	}
	createPrice(data) {
		return http.post("/price", data);
	}
	updatePrice(id, data) {
		return http.put(`/price/${id}`, data);
	}
	deletePrice(id) {
		return http.delete(`/price/${id}`);
	}
	getPrice(id) {
		return http.get(`/price/${id}`);
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DataService();

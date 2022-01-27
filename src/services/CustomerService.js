import http from "./http-token";

class CustomerDataService {

    getAll() {
        return http.get("/customers");
    }

    searchByLastname(key) {
        return http.get(`/customers/search/${key}`);
    }

    delete(id) {
        return http.delete(`/customers/${id}`);
    }

    create(data) {
        return http.post("/customers", data);
    }

    update(id, data) {
        return http.put(`/customers/${id}`, data);
    }
}

export default new CustomerDataService();
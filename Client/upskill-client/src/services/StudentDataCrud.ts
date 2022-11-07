import http from "../AxiosInstance";
import IStudent from "../types/IStudent";

/**Class for handling HTTP requests for student data with the Axios instance. */
class StudentDataCrud {
    get(id: number) {
        return http.get<IStudent>(`/Students/${id}`);
    }

    getAll() {
        return http.get<Array<IStudent>>(`/Students`);
    }

    post(content: IStudent) {
        return http.post<IStudent>(`/Students`, content);
    }

    put(id: number, content: IStudent) {
        return http.put<IStudent>(`/Students/${id}`, content);
    }

    delete(id: number) {
        return http.delete<IStudent>(`/Students/${id}`);
    }

    deleteAll() {
        return http.delete<IStudent>(`/Students`);
    }
}

export default new StudentDataCrud();
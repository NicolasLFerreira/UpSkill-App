import http from "../HttpHandler";
import IStudentData from "../types/IStudentData";

/**Class for handling HTTP requests for student data with the Axios instance. */
class StudentDataCrud {
    get(id: number) {
        return http.get<IStudentData>(`/Students/${id}`);
    }

    getAll() {
        return http.get<Array<IStudentData>>(`/Students`);
    }

    post(content: IStudentData) {
        return http.post<IStudentData>(`/Students`, content);
    }

    put(id: number, content: IStudentData) {
        return http.put<IStudentData>(`/Students/${id}`, content);
    }

    delete(id: number) {
        return http.delete<IStudentData>(`/Students/${id}`);
    }

    deleteAll() {
        return http.delete<IStudentData>(`/Students`);
    }
}

export default new StudentDataCrud();
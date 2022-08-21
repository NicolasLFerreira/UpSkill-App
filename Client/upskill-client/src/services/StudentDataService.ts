import http from "../HttpHandler";
import IStudentData from "../types/IStudentData";

/**Class for handling HTTP requests with the Axios instance. */
class StudentDataService {
    getAll() {
        return http.get<Array<IStudentData>>(`/Students`);
    }

    get(id: number) {
        return http.get<IStudentData>(`/Students/${id}`);
    }

    post(content: IStudentData) {
        return http.post<IStudentData>(`/Students`, content)
    }
}

export default new StudentDataService();
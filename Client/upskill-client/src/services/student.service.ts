import http from "../http-common";
import IStudentData from "../types/student.type";

class StudentDataService {
    getAll() {
        return http.get<Array<IStudentData>>("/students");
    }
}

export default new StudentDataService();
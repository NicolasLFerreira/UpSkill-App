import IStudent from "./IStudent";

export default interface IStudentDisplay extends IStudent {
    areaOfNeedShow?: string,
    responseShow?: string,
    sacShow?: string
}
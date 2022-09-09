import IStudent from "./IStudentData";

export default interface IStudentDisplay extends IStudent {
    areaOfNeedShow?: string,
    responseShow?: string,
    sacShow?: string
}
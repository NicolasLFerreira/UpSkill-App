import IStudentData from "./IStudentData";

export default interface IStudentDataDisplay extends IStudentData {
    areaOfNeedShow?: string,
    responseShow?: string,
    sacShow?: string
}
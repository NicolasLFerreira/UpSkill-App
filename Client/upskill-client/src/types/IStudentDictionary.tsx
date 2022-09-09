import IStudent from "./IStudentData";

export default interface IStudentDictionary {
    [indexer: number]: IStudent;
}
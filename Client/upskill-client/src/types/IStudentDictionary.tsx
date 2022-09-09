import IStudent from "./IStudent";

export default interface IStudentDictionary {
    [indexer: number]: IStudent;
}
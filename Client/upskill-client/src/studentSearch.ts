import IStudent from "./types/IStudent";

const isSubsequence = (input: string, name: string) => {
    var inputSize = input.length
    var nameSize = name.length;
    var inputIndex = 0
    var nameIndex = 0;

    while (inputIndex < inputSize && nameIndex < nameSize) {
        if (input.toLowerCase()[inputIndex] == name.toLowerCase()[nameIndex])
            inputIndex++;
        nameIndex++;
    }

    return inputIndex == inputSize;
}

export default function studentSearch(students: Array<IStudent>, searchInput: string) {
    var filteredStudents: Array<IStudent> =
        students.filter(s =>
            isSubsequence(searchInput.toLocaleLowerCase(), s.firstName + " " + s.lastName)
        );

    return filteredStudents;
}
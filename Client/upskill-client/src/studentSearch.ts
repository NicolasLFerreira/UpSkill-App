import IStudent from "./types/IStudent";

export default function studentSearch(students: Array<IStudent>, searchInput: string, properties: Array<string>) {
    var filteredStudents: Array<IStudent> =
        students.filter(s =>
            isSubsequence(searchInput.toLocaleLowerCase(), buildProperties(s, properties))
        );

    return filteredStudents;
}

// Determines whether input is a substring of the stringfied properties of a student object.
const isSubsequence = (input: string, properties: string) => {
    var inputSize = input.length;
    var propertySize = properties.length;
    var inputIndex = 0;
    var propertyIndex = 0;

    while (inputIndex < inputSize && propertyIndex < propertySize) {
        if (input.toLowerCase()[inputIndex] == properties.toLowerCase()[propertyIndex])
            inputIndex++;
        propertyIndex++;
    }

    return inputIndex == inputSize;
}

// Puts the selected properties of a student in a single string.
const buildProperties = (student: IStudent, strings: Array<string>) => {
    var finalString: string = "";
    for (let i = 0; i < strings.length; i++) {
        finalString += student[strings[i] as keyof IStudent] + " ";
    }

    return finalString;
}
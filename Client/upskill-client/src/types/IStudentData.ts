/**Data fields for the students. */
export default interface IStudentData {
    studentId?: number,
    firstName: string,
    lastName: string,
    yearLevel: string,
    dob: string,
    ethnicity: string,
    tutor: string,
    areaOfNeed: number, // 5 options
    diagnosis: string,
    externalAgencies: string,
    response: number, // 6 options
    sac: number, // 5 options
    notes: string,
    links: string,
    kamarUpdates: string,
    pronoun: string,
    sacInfo: string,
    otherInfo: string
}
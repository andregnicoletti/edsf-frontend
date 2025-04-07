export type CoursesResponse = {
  courses: Array<{
    id: string;
    courseDescription: string;
    numberClass: number;
    averageDuration: string;
    code: string;
  }>;
};

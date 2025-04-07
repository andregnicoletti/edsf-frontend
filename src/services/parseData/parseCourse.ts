import { CoursesResponse } from "../axios/courses/courses.types";

export function parseSortCourses(courses: CoursesResponse): CoursesResponse {
  const sortesCourses = [...courses.courses].sort((a, b) => {
    if (a.courseDescription < b.courseDescription) {
      return -1;
    }
    if (a.courseDescription > b.courseDescription) {
      return 1;
    }
    return 0;
  });

  return {
    ...courses,
    courses: sortesCourses,
  };
}

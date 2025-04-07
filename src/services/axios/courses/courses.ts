import { sendRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import { CoursesResponse } from "./courses.types";

import { parseSortCourses } from "@/services/parseData/parseCourse";
import { Course } from "@/types/Course";

export async function requestCourses(): Promise<Course[]> {
  const response = await sendRequest<CoursesResponse>(
    API_ROUTES_PROTECTED.COURSE
  );

  const responseSorted = parseSortCourses(response.data);

  return responseSorted.courses;
}

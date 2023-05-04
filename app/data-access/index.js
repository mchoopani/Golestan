const makeUsersDb = require("./users.db.js");
const makeStudentDb = require("./students.db.js");
const makeProfessorDb = require("./professors.db.js");
const makeApprovedCourseDb = require("./approved_courses.db.js");
const makeSemesterCourseDb = require("./semester_courses.db.js");
const makeCourseDb = require("./courses.db.js")
const makeManagerDB = require("./managers.db.js");


const Student = require("../models/users/students.model.js");
const Professor = require("../models/users/professor.model.js")
const User = require( "../models/users/users.model.js");
const ApprovedCourse = require("../models/courses/approved_course.model.js");
const SemesterCourse = require("../models/courses/semester_course.model.js");
const Course = require("../models/courses/course.model.js");
const Manager = require("../models/users/manager.model.js");


const usersDb = makeUsersDb(User);
const studentsDb = makeStudentDb(Student);
const professorsDb = makeProfessorDb(Professor);
const managersDb = makeManagerDB(Manager)
const approvedCoursesDb = makeApprovedCourseDb(ApprovedCourse);
const semesterCoursesDb = makeSemesterCourseDb(SemesterCourse);
const coursesDb = makeCourseDb(Course);

module.exports = Object.freeze({
    usersDb,
    studentsDb,
    professorsDb,
    managersDb,
    approvedCoursesDb,
    semesterCoursesDb,
    coursesDb,
})

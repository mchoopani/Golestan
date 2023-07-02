const makeUsersDb = require("./users.db.js");
const makeStudentDb = require("./students.db.js");
const makeProfessorDb = require("./professors.db.js");
const makeApprovedCourseDb = require("./approved_courses.db.js");
const makeSemesterCourseDb = require("./semester_courses.db.js");
const makeCourseDb = require("./courses.db.js")
const makeManagerDB = require("./managers.db.js");
const makeTermDb = require('./terms.db.js');
const makeRegistrationDb = require('./registration.db.js');
const makeModelDB = require('./abstract.db.js');


const Student = require("../models/users/students.model.js");
const Professor = require("../models/users/professor.model.js")
const User = require( "../models/users/users.model.js");
const ApprovedCourse = require("../models/courses/approved_course.model.js");
const SemesterCourse = require("../models/courses/semester_course.model.js");
const Course = require("../models/courses/course.model.js");
const Manager = require("../models/users/manager.model.js");
const Term = require("../models/terms/term.model.js");
const Registration = require("../models/registration_requests/registration.model.js");
const Preregistration = require("../models/registration_requests/preregistration.model.js");
const College = require("../models/college/college.model.js");
const Semester = require("../models/semester/semester.model.js");


const usersDb = makeUsersDb(User);
const studentsDb = makeStudentDb(Student);
const professorsDb = makeProfessorDb(Professor);
const managersDb = makeManagerDB(Manager)
const approvedCoursesDb = makeApprovedCourseDb(ApprovedCourse);
const semesterCoursesDb = makeSemesterCourseDb(SemesterCourse);
const coursesDb = makeCourseDb(Course);
const termsDb = makeTermDb(Term);
const registrationDb = makeRegistrationDb(Registration);
const preregistrationDb = makeRegistrationDb(Preregistration);
const collegeDb = makeModelDB(College);
const semesterDb = makeModelDB(Semester);

module.exports = Object.freeze({
    usersDb,
    studentsDb,
    professorsDb,
    managersDb,
    approvedCoursesDb,
    semesterCoursesDb,
    coursesDb,
    termsDb,
    registrationDb,
    preregistrationDb,
    collegeDb,
    semesterDb,
})

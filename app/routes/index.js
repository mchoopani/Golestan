// const login = require("../use-cases/users/index.js");
const users = require("../use-cases/users/index.js");
const couress = require("../use-cases/courses/index.js");
const terms = require("../use-cases/terms/term.js")
const colleges = require("../use-cases/users/colleges.js");
const semesters = require("../use-cases/users/semesters.js");
const express = require("express");
const controllerUtils = require("../controllers/utils.js");
const controllers = require("../controllers/index.js")
const usersModels = require("../models/users/index.js");
const permissions = require("../middlewares/permissions.js");

const router = express.Router();

const isStudentMiddleWare = permissions.getIsUserTypeMiddleWare(usersModels.Student);
const isProfessorMiddleware = permissions.getIsUserTypeMiddleWare(usersModels.Professor);
const isMangerMiddleware = permissions.getIsUserTypeMiddleWare(usersModels.Manager);
const isITMangerMiddleware = permissions.getIsUserTypeMiddleWare(usersModels.ITManger);
const isUniRolesMiddleware = permissions.getIsUserTypeMiddleWare(usersModels.Student, usersModels.Manager, usersModels.Professor);

router.get('/admin/student/:id', [isITMangerMiddleware], controllerUtils.getController(users.studentsUseCase.getStudentByID));
router.put('/admin/student/:id', [isITMangerMiddleware], controllerUtils.getController(users.studentsUseCase.updateStudent));
router.delete('/admin/student/:id', [isITMangerMiddleware], controllerUtils.getController(users.studentsUseCase.deleteStudent));
router.get('/admin/student', [isITMangerMiddleware], controllerUtils.getController(users.studentsUseCase.getAllStudents));
router.post('/admin/student', [isITMangerMiddleware], controllerUtils.getController(users.studentsUseCase.createStudent));
router.get('/admin/colleges'/*, [isITMangerMiddleware]*/, controllerUtils.getController(colleges.getAll));
router.get('/admin/semesters'/*, [isITMangerMiddleware]*/, controllerUtils.getController(semesters.getAll));

router.get('/admin/professor/:id', [isITMangerMiddleware], controllerUtils.getController(users.professorsUseCase.getProfessorByID));
router.put('/admin/professor/:id', [isITMangerMiddleware], controllerUtils.getController(users.professorsUseCase.updateProfessor));
router.delete('/admin/professor/:id', [isITMangerMiddleware], controllerUtils.getController(users.professorsUseCase.deleteProfessor));
router.get('/admin/professor', [isITMangerMiddleware], controllerUtils.getController(users.professorsUseCase.getAllProfessors));
router.post('/admin/professor', [isITMangerMiddleware], controllerUtils.getController(users.professorsUseCase.createProfessor));

router.get('/admin/manager/:id', [isITMangerMiddleware], controllerUtils.getController(users.managersUseCase.getManagerByID));
router.put('/admin/manager/:id', [isITMangerMiddleware], controllerUtils.getController(users.managersUseCase.updateManager));
router.delete('/admin/manager/:id', [isITMangerMiddleware], controllerUtils.getController(users.managersUseCase.deleteManager));
router.get('/admin/manager', [isITMangerMiddleware], controllerUtils.getController(users.managersUseCase.getAllManagers));
router.post('/admin/manager', [isITMangerMiddleware], controllerUtils.getController(users.managersUseCase.createManager));

router.get('/courses', [isUniRolesMiddleware], controllers.courses.getAllCourses);
router.get('/courses/:id', [isUniRolesMiddleware], controllers.courses.getCourse);
router.post('/courses', [isMangerMiddleware], controllers.courses.createCourse);
router.put('/courses/:id', [isMangerMiddleware], controllerUtils.getController(couress.coursesUseCase.updateCourse));
router.delete('/courses/:id', [isMangerMiddleware], controllerUtils.getController(couress.coursesUseCase.deleteCourse));

router.get('/student', [isMangerMiddleware], controllerUtils.getController(users.studentsUseCase.getAllStudents));
router.get('/student/:id', [isMangerMiddleware], controllerUtils.getController(users.studentsUseCase.getStudentByID));
router.get('/professor', [isMangerMiddleware], controllerUtils.getController(users.professorsUseCase.getAllProfessors));
router.get('/professor/:id', [isMangerMiddleware], controllerUtils.getController(users.professorsUseCase.getProfessorByID));

router.put('/student/:id', [isStudentMiddleWare], controllerUtils.getOwnAccessController(users.studentsUseCase.updateStudent, usersModels.Student));
router.put('/professor/:id', [isProfessorMiddleware], controllerUtils.getOwnAccessController(users.professorsUseCase.updateProfessor, usersModels.Professor));

router.get('/terms', controllerUtils.getController(terms.getAllTerms))
router.get('/terms/:id', [isMangerMiddleware], controllerUtils.getController(terms.getTermByID))
router.post('/terms', [isMangerMiddleware], controllerUtils.getController(terms.createTerm))
router.put('/terms/:id', [isMangerMiddleware], controllerUtils.getController(terms.updateTermById))
router.delete('/terms/:id', [isMangerMiddleware], controllerUtils.getController(terms.deleteTermById))
router.post('/terms/:id/preregistration', [isMangerMiddleware], controllers.terms.addPreregistrationCourse)
router.get('/terms/:id/preregistration_courses', [isUniRolesMiddleware], controllers.terms.getPreregistrationCoursesOfTerm)
router.delete('/terms/:id/preregistration/:course_id'/*, [isMangerMiddleware]*/, controllers.terms.deleteCourseFromPreregistrationCourseListOfTerm)
router.post('/terms/:id/registration', [isMangerMiddleware], controllers.terms.addRegistrationCourse)
router.get('/terms/:id/registration_courses', [isMangerMiddleware], controllers.terms.getRegistrationCoursesOfTerm)
router.delete('/terms/:id/registration/:course_id', [isMangerMiddleware], controllers.terms.deleteCourseFromRegistrationCourseListOfTerm)
router.get('/course/:id/preregistrations', [isMangerMiddleware], controllers.courses.getCoursePreregistrations)
router.put('/registration/:id', [isProfessorMiddleware], controllers.registrations.acceptOrDenyRegistration)
router.post('/course/:id/preregister'/*, [isStudentMiddleWare]*/, controllers.registrations.preregister)
router.delete('/course/:id/preregister', [isStudentMiddleWare], controllers.registrations.cancelPreregister)
router.get('/terms/:id/preregistrations'/*, [isStudentMiddleWare]*/, controllers.registrations.getPreregisteredCoursesOfTerm)
router.post('/course/:id/register', [isStudentMiddleWare], controllers.registrations.register)
router.delete('/course/:id/register', [isStudentMiddleWare], controllers.registrations.cancelRegister)
router.get('/terms/:id/registrations'/*, [isStudentMiddleWare]*/, controllers.registrations.getRegisteredCoursesOfTerm)
router.get('/courses/:id/registrations'/*, [isProfessorMiddleware]*/, controllers.courses.getCourseRegistrations)

module.exports = router
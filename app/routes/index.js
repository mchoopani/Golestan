// const login = require("../use-cases/users/index.js");
const users = require("../use-cases/users/index.js");
const couress = require("../use-cases/courses/index.js");
const express = require("express");
const controllerUtils = require("../controllers/utils.js");
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

router.get('/courses', [isUniRolesMiddleware], controllerUtils.getController(couress.coursesUseCase.getAllCourses));
router.get('/courses/:id', [isUniRolesMiddleware], controllerUtils.getController(couress.coursesUseCase.getCourseByID));
router.post('/courses', [isMangerMiddleware], controllerUtils.getController(couress.coursesUseCase.createCourse));
router.put('/courses/:id', [isMangerMiddleware], controllerUtils.getController(couress.coursesUseCase.updateCourse));
router.delete('/courses/:id', [isMangerMiddleware], controllerUtils.getController(couress.coursesUseCase.deleteCourse));

router.get('/student', [isMangerMiddleware],controllerUtils.getController(users.studentsUseCase.getAllStudents));
router.get('/student/:id', [isMangerMiddleware],controllerUtils.getController(users.studentsUseCase.getStudentByID));
router.get('/professor', [isMangerMiddleware], controllerUtils.getController(users.professorsUseCase.getAllProfessors));
router.get('/professor/:id', [isMangerMiddleware],controllerUtils.getController(users.professorsUseCase.getProfessorByID));

router.put('/student/:id', [isStudentMiddleWare], controllerUtils.getOwnAccessController(users.studentsUseCase.updateStudent, usersModels.Manager, usersModels.Student));
router.put('/professor/:id', [isProfessorMiddleware], controllerUtils.getOwnAccessController(users.professorsUseCase.updateProfessor, usersModels.Professor));

module.exports = router
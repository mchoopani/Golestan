const accessDb = require("../../data-access");
const errors = require("../../errors");

async function acceptRegistration(id) {
    const reg = await accessDb.registrationDb.updateByID(id, {status: "accept"})
    if (reg == null) {
        throw new errors.NotFoundError("registration not found")
    }
    return reg
}

async function rejectRegistration(id) {
    const reg = await accessDb.registrationDb.updateByID(id, {status: "reject"})
    if (reg == null) {
        throw new errors.NotFoundError("registration not found")
    }
    return reg
}

async function createPreregistration(courseId, studentId) {
    const course = await accessDb.semesterCoursesDb.findByID(courseId)
    if (course == null) {
        throw new errors.NotFoundError("course not found")
    }
    for (const prereg of course.preregistrations) {
        if (prereg.requestedStudent.id === studentId) {
            throw new errors.ValidationError("student pre registered before")
        }
    }
    const student = await accessDb.studentsDb.findByID(studentId)
    if (student == null) {
        throw new Error("internal error in finding current student")
    }
    const reg = await accessDb.preregistrationDb.create({requestedStudent: student})
    course.preregistrations.push(reg)
    await accessDb.semesterCoursesDb.updateByID(courseId, course)
    student.preregistrationCourses.push(course)
    await accessDb.studentsDb.updateByID(student._id, student)
}

async function createRegistration(courseId, studentId) {
    const course = await accessDb.semesterCoursesDb.findByID(courseId)
    if (course == null) {
        throw new errors.NotFoundError("course not found")
    }
    for (const prereg of course.registrations) {
        if (prereg.requestedStudent.id === studentId) {
            throw new errors.ValidationError("student pre registered before")
        }
    }
    const student = await accessDb.studentsDb.findByID(studentId)
    if (student == null) {
        throw new Error("internal error in finding current student")
    }
    const reg = await accessDb.registrationDb.create({requestedStudent: student})
    course.registrations.push(reg)
    await accessDb.semesterCoursesDb.updateByID(courseId, course)
    student.registrationCourses.push(course)
    await accessDb.studentsDb.updateByID(student._id, student)
}

async function cancelPreregistration(courseId, studentId) {
    const course = await accessDb.semesterCoursesDb.findByID(courseId)
    if (course == null) {
        throw new errors.NotFoundError("course not found")
    }
    let toDeleteIndex = undefined
    for (let i = 0; i < course.preregistrations.length; i++) {
        const prereg = course.preregistrations[i]
        if (prereg.requestedStudent.id === studentId) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        console.log("unexpected not existing pre reg in course preregistration list")
        // continue anyway
    } else {
        course.preregistrations = course.preregistrations.splice(toDeleteIndex, 1)
        await accessDb.semesterCoursesDb.updateByID(course._id, course)
    }

    const prereg = await accessDb.preregistrationDb.deleteOneByQuery({'requestedStudent.id': req.user.id})
    if (prereg == null) {
        throw new errors.NotFoundError("prereg of this student for this course not found")
    }

    const student = await accessDb.studentsDb.findByID(studentId)
    if (student == null) {
        throw new Error("internal error in finding current student")
    }
    toDeleteIndex = undefined
    for (let i = 0; i < student.preregistrationCourses.length; i++) {
        const preregCourse = student.preregistrationCourses[i]
        if (preregCourse._id === prereg.course._id) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        console.log("unexpected not existing pre reg in student preregistration course list")
        // continue anyway
    } else {
        student.preregistrationCourses = student.preregistrationCourses.splice(toDeleteIndex, 1)
        await accessDb.studentsDb.updateByID(student._id, student)
    }
}

async function cancelRegistration(courseId, studentId) {
    const course = await accessDb.semesterCoursesDb.findByID(courseId)
    if (course == null) {
        throw new errors.NotFoundError("course not found")
    }
    let toDeleteIndex = undefined
    for (let i = 0; i < course.registrations.length; i++) {
        const reg = course.registrations[i]
        if (reg.requestedStudent.id === studentId) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        console.log("unexpected not existing pre reg in course registration list")
        // continue anyway
    } else {
        course.registrations = course.registrations.splice(toDeleteIndex, 1)
        await accessDb.semesterCoursesDb.updateByID(course._id, course)
    }

    const reg = await accessDb.registrationDb.deleteOneByQuery({'requestedStudent.id': req.user.id})
    if (reg == null) {
        throw new errors.NotFoundError("reg of this student for this course not found")
    }

    const student = await accessDb.studentsDb.findByID(studentId)
    if (student == null) {
        throw new Error("internal error in finding current student")
    }
    toDeleteIndex = undefined
    for (let i = 0; i < student.registrationCourses.length; i++) {
        const regCourse = student.registrationCourses[i]
        if (regCourse._id === prereg.course._id) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        console.log("unexpected not existing pre reg in student preregistration course list")
        // continue anyway
    } else {
        student.registrationCourses = student.registrationCourses.splice(toDeleteIndex, 1)
        await accessDb.studentsDb.updateByID(student._id, student)
    }
}

async function getPreregisteredCoursesOfStudent(studentId, termId) {
    const student = await accessDb.studentsDb.findByID(studentId)
    if (student === null) {
        throw new Error("internal error in finding current student")
    }

    const term = await accessDb.termsDb.findByID(termId)
    if (term === null) {
        throw new errors.NotFoundError("term not found")
    }

    return student.preregistrationCourses.filter(el=>el.semester === term.name)
}

async function getRegisteredCoursesOfStudent(studentId, termId) {
    const student = await accessDb.studentsDb.findByID(studentId)
    if (student === null) {
        throw new Error("internal error in finding current student")
    }

    const term = await accessDb.termsDb.findByID(termId)
    if (term === null) {
        throw new errors.NotFoundError("term not found")
    }

    return student.registrationCourses.filter(el=>el.semester === term.name)
}

async function getAllRegisteredCourses(termId) {
    const term = await accessDb.termsDb.findByID(termId)
    if (term === null) {
        throw new errors.NotFoundError("term not found")
    }

    return term.registrationCourses
}

module.exports = Object.freeze({
    acceptRegistration,
    rejectRegistration,
    createPreregistration,
    cancelPreregistration,
    getPreregisteredCoursesOfStudent,
    createRegistration,
    cancelRegistration,
    getRegisteredCoursesOfStudent,
    getAllRegisteredCourses,
})

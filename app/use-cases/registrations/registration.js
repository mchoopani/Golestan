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
        if (prereg.requestedStudent._id === studentId) {
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
    student.preregistrationCourses.push(course._id)
    await accessDb.studentsDb.updateByID(student._id, student)
}

async function createRegistration(courseId, studentId) {
    const course = await accessDb.semesterCoursesDb.findByID(courseId)
    if (course == null) {
        throw new errors.NotFoundError("course not found")
    }
    for (const prereg of course.registrations) {
        if (prereg.requestedStudent.id === studentId) {
            throw new errors.ValidationError("student registered before")
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

async function cancelPreregistration(courseId, studentId, usercode) {
    const course = await accessDb.semesterCoursesDb.findByID(courseId)
    if (course == null) {
        throw new errors.NotFoundError("course not found")
    }
    let toDeleteIndex = undefined
    for (let i = 0; i < course.preregistrations.length; i++) {
        const prereg = course.preregistrations[i]
        if (String(prereg.requestedStudent.id) === studentId) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        console.log("unexpected not existing pre reg in course preregistration list")
        // continue anyway
    } else {
        course.preregistrations.splice(toDeleteIndex, 1)
        await accessDb.semesterCoursesDb.updateByID(course._id, course)
    }

    // const prereg = await accessDb.preregistrationDb.deleteOneByQuery({'requestedStudent': {usercode: usercode}})
    // if (prereg == null) {
    //     throw new errors.NotFoundError("prereg of this student for this course not found")
    // }
    const allPrereg = await accessDb.preregistrationDb.findAll()
    toDeleteIndex = undefined
    for (let i = 0; i < allPrereg.length; i++) {
        const prereg = allPrereg[i]
        if (String(prereg.requestedStudent.id) === studentId) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        throw new errors.NotFoundError("prereg of this student for this course not found")
    }
    await accessDb.preregistrationDb.deleteByID(allPrereg[toDeleteIndex])

    const student = await accessDb.studentsDb.findByID(studentId)
    if (student == null) {
        throw new Error("internal error in finding current student")
    }
    toDeleteIndex = undefined
    for (let i = 0; i < student.preregistrationCourses.length; i++) {
        const preregCourse = student.preregistrationCourses[i]
        if (String(preregCourse._id) === courseId) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        console.log("unexpected not existing pre reg in student preregistration course list")
        // continue anyway
    } else {
        student.preregistrationCourses.splice(toDeleteIndex, 1)
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
        course.registrations.splice(toDeleteIndex, 1)
        await accessDb.semesterCoursesDb.updateByID(course._id, course)
    }

    // await accessDb.registrationDb.deleteOneByQuery({'requestedStudent.id': studentId})
    const allReg = await accessDb.registrationDb.findAll()
    toDeleteIndex = undefined
    for (let i = 0; i < allReg.length; i++) {
        const reg = allReg[i]
        if (String(reg.requestedStudent.id) === studentId) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        throw new errors.NotFoundError("reg of this student for this course not found")
    }
    await accessDb.registrationDb.deleteByID(allReg[toDeleteIndex])

    const student = await accessDb.studentsDb.findByID(studentId)
    if (student == null) {
        throw new Error("internal error in finding current student")
    }
    toDeleteIndex = undefined
    for (let i = 0; i < student.registrationCourses.length; i++) {
        const regCourse = student.registrationCourses[i]
        if (String(regCourse._id) === courseId) {
            toDeleteIndex = i
            break
        }
    }
    if (toDeleteIndex === undefined) {
        console.log("unexpected not existing pre reg in student preregistration course list")
        // continue anyway
    } else {
        student.registrationCourses.splice(toDeleteIndex, 1)
        await accessDb.studentsDb.updateByID(student._id, student)
    }
}

async function getPreregisteredCoursesOfTerm(studentId, termId) {
    const student = await accessDb.studentsDb.findByID(studentId)
    if (student === null) {
        throw new Error("internal error in finding" +
            " current student")
    }

    const term = await accessDb.termsDb.findByID(termId)
    if (term === null) {
        throw new errors.NotFoundError("term not found")
    }
    return term.preregistrationCourses.map(element => {
        const userIds = element.preregistrations.map(req => String(req.requestedStudent._id))
        return {...element._doc, registered_before: userIds.includes(studentId)}
    })
}

async function getRegisteredCoursesOfTerm(studentId, termId) {
    const student = await accessDb.studentsDb.findByID(studentId)
    if (student === null) {
        throw new Error("internal error in finding current student")
    }

    const term = await accessDb.termsDb.findByID(termId)
    if (term === null) {
        throw new errors.NotFoundError("term not found")
    }
    return term.registrationCourses.map(element => {
        const userIds = element.registrations.map(req => String(req.requestedStudent._id))
        return {...element._doc, registered_before: userIds.includes(studentId)}
    })
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
    getPreregisteredCoursesOfTerm,
    createRegistration,
    cancelRegistration,
    getRegisteredCoursesOfTerm,
    getAllRegisteredCourses,
})

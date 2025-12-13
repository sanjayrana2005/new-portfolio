const addSkillValidation = (req) => {
    const { title, proficiency } = req.body || {};
    const { svg } = req.files || {};

    if (!title) {
        throw new Error("Enter title");
    } else if (title.trim().length > 20) {
        throw new Error("Title should below 20 characters");
    }

    if (!proficiency) {
        throw new Error("Enter proficiency");
    }


    if (!req.files || !svg) {
        throw new Error("skill Icon/svg required");
    }
    return true;
}

const updateSkillValidation = (req) => {
    const data = req.body || {};
    const ALLOWED_UPDATES="proficiency";

    const isValid = Object.keys(data).every((field)=>ALLOWED_UPDATES);

    if(!isValid){
        throw new Error("Invalid update request");
    }
    return true;
}

module.exports = {
    addSkillValidation,
    updateSkillValidation
}
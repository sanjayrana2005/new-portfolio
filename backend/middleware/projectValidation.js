const validation = require("validator");

const addProjectValidation = (req) => {
    const { title, description, gitRepoLink, projectLink, technologies, stack, deployed } = req.body || {};
    const { projectImage } = req.files || {};

    if (!title) {
        throw new Error("Enter title");
    } else if (title.trim().length > 50) {
        throw new Error("Title should below 50 characters");
    }

    if (!description) {
        throw new Error("Enter description");
    } else if (description.trim().length > 500) {
        throw new Error("description should below 500 characters");
    }

    if (!gitRepoLink) {
        throw new Error("Enter gitRepo link");
    } else if (!validation.isURL(gitRepoLink.trim())) {
        throw new Error("Invalid gitRepo link");
    }

    if (!technologies) {
        throw new Error("Enter technologies");
    }

    if (!stack) {
        throw new Error("Enter stack");
    } else if (stack.trim().length > 10) {
        throw new Error("Stack should below 10 characters");
    }

    if (!deployed) {
        throw new Error("Select Deployed");
    } else if (!validation.isBoolean(deployed.toString())) {
        throw new Error("Invalid Deployed type");
    }

    if (!req.files || !projectImage) {
        throw new Error("Upload project preview image Required");
    }

    return true;
}

const updateProjectValidation = (req) => {
    const data = req.body || {};
    const ALLOWED_UPDATES = ["title", "description", "gitRepoLink", "projectLink", "technologies", "stack", "deployed", "projectImage"]

    const isValid = Object.keys(data).every((field) => ALLOWED_UPDATES.includes(field));
    if (!isValid) {
        throw new Error("Invalid update request");
    }

    if (data.title && data.title.trim().length > 50) {
        throw new Error("Title should below 50 characters");
    }

    if (data.description && data.description.trim().length > 500) {
        throw new Error("Title should below 50 characters");
    }

    if (data.gitRepoLink && !validation.isURL(data.gitRepoLink.trim())) {
        throw new Error("Invalid gitRepo link");
    }

    if (data.projectLink && !validation.isURL(data.projectLink.trim())) {
        throw new Error("Invalid project link");
    }

    if (data.stack && data.stack.trim().length > 10) {
        throw new Error("Stack should below 10 characters");
    }

    if (data.deployed && !validation.isBoolean(data.deployed.toString())) {
        throw new Error("Invalid Deployed type");
    }
    return true;
}

module.exports = {
    addProjectValidation,
    updateProjectValidation
}
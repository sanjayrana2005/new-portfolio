const validator = require("validator");

const postTimeLineValidation = (req) => {
    const {title,description,from} = req.body
    if(!title){
        throw new Error("Enter title");
    } 
    if(title.trim().length < 5){
        throw new Error("Title should atleast 5 characters");
    }else if(title.trim().length > 10){
        throw new Error("Title should less than 10 characters");
    }
    if(!description){
        throw new Error("Enter description");
    } else if(description.trim().length > 500){
        throw new Error("Description should less than 500 characters");
    }
    if(!from){
        throw new Error("Enter starting timeline");
    }

    return true;
}

module.exports = {
    postTimeLineValidation,
}
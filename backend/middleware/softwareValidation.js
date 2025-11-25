const addnewApplicationValidation = (req) => {
    const {name} = req.body;
    const {svg}=req.files || {};

    if(!name){
        throw new Error("Enter software name");
    }else if(name.trim().length>10){
        throw new Error("Software name should below 10 characters");
    }

    if(!req.files || !svg){
        throw new Error("Software application Icon/svg required");
    }
    return true;
}

module.exports = {
    addnewApplicationValidation
}
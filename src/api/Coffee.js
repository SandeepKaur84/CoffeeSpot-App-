import api from "./api";

export const getCoffeeData = async() => {
    try{
        const response = await api.get("/getCoffee");
        return response.data;
    }catch(err) {
        console.log( "Error ocured while getting coffee dataa ", err);
    }
};
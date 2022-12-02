import axios from "axios"

const FetchCreator = async (id) => {
    
    try {

        const {data} = await axios.get(`/api/users/${id}`)
        return data

    } catch (error) {
        console.log("E" , error);
    }
    

}
export default FetchCreator

import commenAPI from "./commenApi"
import { server_url } from "./serverURL"
//add card with title

export const addCardApi=async(CardDetails) =>{
    return await commenAPI("POST",`${server_url}/Cards`,CardDetails)
}

//get card details
export const getCardApi=async() =>{
    return await commenAPI("GET",`${server_url}/Cards`,"")
}

//delete card
export const deleteCardApi=async(cardId)=>{
    return await commenAPI("DELETE",`${server_url}/Cards/${cardId}`,{})
}

//add task by updating card

export const addTaskApi=async(tasks,id) =>{
    return await commenAPI("PUT",`${server_url}/Cards/${id}`,tasks)
}

//get task 

export const getTasksApi=async(id)=>{
return await commenAPI("GET",`${server_url}/Cards/${id}`,"")
}

//get card by card id
export const getCardByIdApi=async(cardId) =>{
    return await commenAPI("GET",`${server_url}/Cards/${cardId}`,"")
}
//delete task from card by id





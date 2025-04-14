import Todo from "../models/todo.js";
import generateUUID from "../utils/generateUUID.js";
import respond from "../utils/respond.js";


//create TODO



export const createTodo=async(req,res)=>{
    try {
        const id=generateUUID();
        const userId=req.user.id;
        const {title,description,dueDate}=req.body;
        if (!title||!dueDate) {
            return respond(res,400,"Please fill all the details");
        }
        const newTodo=await Todo.create({id,title,description,dueDate, userId});
        return respond(res,201,"Todo created Successfully!",newTodo);
    } catch (error) {
        console.error("Todo: err ",error);
        return respond(res,500,"Something Went Wrong");
    }

}

// Read Todo Logic of a User

export const getAllTodo=async(req,res)=>{
   
    try {
        const userId=req.user.id;
        const todos=await Todo.findAll({where:{userId}});
        return respond(res,200,"Todos feteched Successfully",todos);
    } catch (error) {
        console.error("Todo fetch :err ",error);
        return respond(res,500,"Something Went Wrong");
    }
}

//
export const updateTodobyuserId=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {id}=req.params;
        const {title,description,dueDate,isCompleted}=req.body;
        const todo=await Todo.findOne({where:{id,userId}});
        if (!todo) {
            return respond(res,400,"Todo not found");
        }
        todo.title=title||todo.title;
        todo.description=description||todo.description;
        todo.dueDate=dueDate||todo.dueDate;
        todo.isCompleted=isCompleted||todo.isCompleted;

        await todo.save();
        return respond(res,200,"Todo Updated Successfully");
    } catch (error) {
        console.error("error from update todo",error);
        return respond(res,500,"Something Went Wrong");
    }
}

export const deleteTodo=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {id}=req.params;
        const todo=await Todo.findOne({where:{id,userId}});
        if(!todo){
            return respond(res,400,"Todo has not been deleted due to not found");

        }
        await todo.destroy();
        return respond(res,200,"Todo deleted successfully");

    } catch (error) {
        console.error("error from delete todo",error);
        return respond(res,500,"Something Went Wrong");
    }
}
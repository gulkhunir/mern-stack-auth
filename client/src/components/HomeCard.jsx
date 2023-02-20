import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deletePostAction } from "../redux/actions/post";

const HomeCard = ({ post }) => {
  const dispatch =useDispatch()

  const deletePost=(id)=>{
    dispatch(deletePostAction(id))
    //window.location.reload()
    toast("Delete operation successful",{
      position: "top-left",
      autoClose: 5000
  })
  }

  const updatePost=(id)=>{
    dispatch({type:'MODAL',payload:{open:true , updateId:id}})
    
  }
  return (
    <div className="relative w-1/4 border p-3 rounded-md bg-gray-50 mx-5">
      <div className="font-bold text-xl">{post?.title}</div>
      <div className="text-gray-700 text-sm">{post?.description}</div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">{post?.user}</span>
        <span className="text-xs text-gray-500">
          {(post?.date).substring(0,10)}
        </span>
      </div>
      <div className="absolute -top-3 -right-3 flex items-center space-x-3">
        <AiOutlineDelete onClick={()=> deletePost(post._id)} size={22} className="bg-red-500 rounded-full text-white p-1 cursor-pointer"/>
        <GrUpdate onClick={()=> updatePost(post._id)} size={22} className="bg-red-500 rounded-full text-white p-1 cursor-pointer" />
      </div>
    </div>
  );
};

export default HomeCard;

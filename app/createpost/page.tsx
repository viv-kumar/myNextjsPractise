"use client";
import React from "react";
import  {useRouter}  from "next/navigation";
import { useState, useEffect } from "react";

const page = () => {
  const router = useRouter();
//   const [data, setData] = useState([]);

  const [user, setUser] = useState({
    userId: "",
    id: "",
    title: "",
    body: ""
  });
  
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);


 const onAdd=()=>{
    const savedDataString = localStorage.getItem("myData");
    console.log(savedDataString)
      const savedData = JSON.parse(savedDataString);
      console.log(savedData)
       savedData.push(user)
       const updatedUser=JSON.stringify(savedData)
       localStorage.setItem("myData",updatedUser)
       setUser({ userId: "", id: "", title: "", body: "" });
    //    router.push("./")
   
 }

  useEffect(() => {
    if (user.title.length > 0 && user.body.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-red">
      <hr />
      <label htmlFor="title">Title</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="title"
        value={user.title}
        required
        onChange={(e) => setUser({ ...user, title: e.target.value })}
        placeholder="Add title"
      />
      <label htmlFor="post">Post</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="post"
        required
        value={user.body}
        placeholder="Add post"
        onChange={(e) => setUser({ ...user, body: e.target.value })}
      />

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onAdd}
      >
        {buttonDisabled ? "No AddPost" : "AddPost"}
      </button>
    </div>
  );
};

export default page;

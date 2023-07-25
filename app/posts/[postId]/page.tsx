"use client"
import React, { useEffect, useState } from 'react'

function page({params}:{params: {
    postId: number
}}) {
    // const router = useRouter();
 const [user,setUser]=useState(null)
 const [inputValue, setInputValue] = useState("");
 const [stringArray, setStringArray] = useState([]);
 const [users, setUsers] = useState([]);
 const [comment, setComment] = useState([]);
  useEffect(()=>{
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
      .then((response) => response.json())
      .then((json) => setUser(json));
     
  },[])
   const handleComment = (e) => {
     e.stopPropagation();

     const savedDataString = localStorage.getItem("myStringArray");
     if (savedDataString) {
       // Parse the JSON string back to a data array
       const savedData = JSON.parse(savedDataString);
       setComment(savedData);
     }
   };
   const addComment = (e) => {
     e.stopPropagation();
     setStringArray((prevArray) => [...prevArray, inputValue]);
     setInputValue("");
     const jsonString = JSON.stringify(stringArray);
     // Save the JSON string to local storage with a specific key
     localStorage.setItem("myStringArray", jsonString);
     // setInputValue("");
   };
   console.log(user);
  return (
    <>
      {user ? (
        <div class="flex justify-center alignItem-center p-4 ">
          <article class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">
              <time datetime="2020-03-16" class="text-gray-500">
                Mar 16, 2020
              </time>
              <a
                href="#"
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                Marketing
              </a>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span class="absolute inset-0"></span>
                  {user.title}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {user.body}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 ">
              <button
                onClick={handleComment}
                className="block w-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                see comment
                {comment.map((ele) => {
                  return <p className="border-2">{ele}</p>;
                })}
              </button>
              <button
                onClick={addComment}
                className="block w-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add comment{" "}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-black"
                />
              </button>
            </div>
          </article>
        </div>
      ) : (
        <p>...loading</p>
      )}
    </>
  );
}

export default page
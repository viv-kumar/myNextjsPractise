"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
const cmt = [
  "hii..soo good",
  "this is very awesome",
  "this is crazy",
  "i will be very amazed by wathing this",
];
const itemsPerPage = 3;
export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [stringArray, setStringArray] = useState([]);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);
  useEffect(() => {
    if (users) {
      // Convert the data object to a JSON string
      const dataString = JSON.stringify(users);
      // Save the JSON string to local storage with a key
      localStorage.setItem("myData", dataString);
    }
  }, [users]);
  useEffect(() => {
    const savedDataString = localStorage.getItem("myData");
    if (savedDataString) {
      // Parse the JSON string back to a data object
      const savedData = JSON.parse(savedDataString);
      setUsers(savedData);
    }
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get the current page of items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  };

  // Go to the next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

 

  return (
    <div class="bg-white py-24 sm:py-32 ">
      <div className="flex   justify-end  p-4">
        <Link href={"./createpost"}>
          {" "}
          <button className="block w-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create blog
          </button>
        </Link>
      </div>

      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {getCurrentPageItems().map((ele, id) => {
            return (
              // <Link href={`/posts/${ele.id}`}>
              <article
                class="flex max-w-xl flex-col items-start justify-between"
                key={id}
                onClick={() => {
                  router.push(`/posts/${ele.id}`);
                }}
              >
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
                      {ele.title}
                    </a>
                  </h3>
                  <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {ele.body}
                  </p>
                </div>
               
              </article>
              // </Link>
            );
          })}
          <div className="flex items-center justify-between gap-4 ">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

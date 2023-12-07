"use client";
import React, { useState, useEffect } from "react";

export default function Search() {
  const [data, setData] = useState([]);

  const [imageData, setImageData] = useState(null);
  const [imageContent, setImageContent] = useState(null);


  useEffect(() => {
    let url = "https://tekno-vibe-be.vercel.app/search";

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        loadImage();
      });
    
    loadImage();
  }, []);

  const loadImage = async () => {
    try {
      const currentURL = window.location.href;
      const Id = currentURL.split('/').pop();

      await fetch(`https://tekno-vibe-be.vercel.app/event/${Id}/getImage`)
      .then((response) => response.json())
      .then((data) => {
        setImageData(data.data.data);
        setImageContent(data.contentType);
        // console.log(imageData);
        // console.log(imageContent);
      });
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  return (
    <main id="search">
      <div className="flex justify-center items-center">
        <h3 className="bg-purple-200 px-5 py-2.5 text-md text-white-100 font-semibold rounded-md text-center w-fit">
          CARI EVENT
        </h3>
      </div>
      <div className="flex justify-center items-center mt-5 mb-10">
        <h1 className="text-black-900 text-2xl font-bold">
          Cari Eventmu Di sini!
        </h1>
      </div>

      <section className="searchEvent flex-wrap flex justify-center items-center mt-5">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 auto-rows-max gap-8 cursor-pointer">
          {data.slice(0, 8).map((rows) => (
            <>
              <a href={`/eventDetails/${rows._id}`} key={rows._id}>
                <div
                  key={rows._id}
                  className=" w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 drop-shadow-[0_20px_10px_rgba(0,0,0,0.25)] hover:shadow-2xl hover:cursor-pointer"
                >
                  <div className="relative h-40 w-full rounded-xl bg-gray-100">
                  {
                    imageData && (
                    <img 
                    id='base64image' 
                    src={`data:${imageContent};base64,${Buffer.from(imageData).toString('base64')}`} 
                    alt="Uploaded Image"
                    className="object-cover w-full h-full rounded-lg"
                    />)
                  }
                    {/* <img
                      className="object-cover w-full h-full rounded-xl"
                      src={rows.eventProfileUrl}
                      alt="none"
                    /> */}
                  </div>

                  <div className="p-2">
                    <h2 className="font-bold text-[19px]">{rows.eventName}</h2>

                    <p className="text-sm text-gray-600">
                      {rows.eventDescription.length > 20
                        ? `${rows.eventDescription.slice(0, 20)}....`
                        : rows.eventDescription}
                    </p>
                    <span className="bg-purple-200 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      {rows.department}
                    </span>
                  </div>

                  <div>
                    <div className="flex space-x-2"></div>
                  </div>
                </div>
              </a>
            </>
          ))}
        </div>
      </section>
      <div className="mt-6 flex place-content-center">
        <a
          href={"/search"}
          class="text-purple-200 font-bold py-2 px-4 rounded flex items-center justify-center transition-transform duration-300 transform hover:translate-y-1 hover:cursor-pointer"
        >
          <span class="mr-2 hover:text-black">View More</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 14z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </main>
  );
}

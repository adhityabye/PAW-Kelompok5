"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CircleBgSearchpg from "@/app/components/circleBgSearchpg";

import React, { useState, useEffect } from "react";

export default function SearchEvent() {
  const [activeButton, setActiveButton] = useState(null);
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const [imageData, setImageData] = useState(null);
  const [imageContent, setImageContent] = useState(null);

  const departments = [
    "TEKNIK",
    "DTETI",
    "DTK",
    "DTMI",
    "DTAP",
    "DTNTF",
    "DTGL",
    "DTSL",
    "DTGD",
  ];

  const handleClick = (buttonIndex) => {
    if (activeButton == buttonIndex) setActiveButton(null);
    else setActiveButton(buttonIndex);
  };

  useEffect(() => {
    let url = "http://localhost:9090/search";

    const params = new URLSearchParams();
    if (searchString !== "") params.append("name", searchString);
    if (activeButton !== null)
      params.append("department", departments[activeButton]);

    if (params.size > 0) url = url + "?" + params.toString();

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        loadImage();
      });
      
    loadImage();
  }, [activeButton, searchString]);

  const loadImage = async () => {
    try {
      const currentURL = window.location.href;
      const Id = currentURL.split('/').pop();

      await fetch(`http://localhost:9090/event/${Id}/getImage`)
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
    <div className="flex flex-col h-screen justify-between">
      <Navbar cari={true} />
      <CircleBgSearchpg />
      <div className="flex flex-col items-center justify-center m-10">
        <h1 className="text-2xl font-bold mb-5 mt-10">
          Temukan Event Menarik dan Daftarkan Diri Anda!
        </h1>
        <input
          type="text"
          placeholder="Cari event yang anda inginkan"
          className="p-2 border border-gray-200 rounded-md w-1/2"
          onKeyDown={(event) => {
            if (event.key === "Enter") setSearchString(event.target.value);
          }}
        />

        <div className="flex mt-4">
          {departments.map((fakultas, index) => {
            return (
              <button
                className={`font-bold filter-item px-4 py-2 border border-gray-200 rounded-full m-2 transform transition-all hover:-translate-y-1 duration-100 ${
                  activeButton === index ? "bg-button-dark text-white" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                {fakultas}
              </button>
            );
          })}
        </div>
      </div>

      {/*non template cards*/}
      <section className="searchEvent flex-wrap flex justify-center items-center mt-5 mb-24">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 auto-rows-max gap-8 cursor-pointer">
          {data.map((rows) => (
            <>
              <a href={`/eventDetails/${rows._id}`} key={rows._id}>
                <div
                  key={rows._id}
                  className="flex flex-col w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 drop-shadow-[0_20px_10px_rgba(0,0,0,0.25)] hover:shadow-2xl hover:cursor-pointer"
                  // onClick={() =>}
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
                      {rows.eventDescription.length > 20 ? `${rows.eventDescription.slice(0,20)}...`: rows.eventDescription}
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
      <Footer/>
    </div>
  );
}

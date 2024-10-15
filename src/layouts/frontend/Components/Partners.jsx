import React from 'react';
import nsu from "../assets/nsu.jpg";
import spark from "../assets/spark.jpg";
import arduino from "../assets/arduino.jpg";
import esp32 from "../assets/esp32.jpg";
import rasp from "../assets/rasp.png";
import tinkercad from "../assets/tinkercad.jpg";

import c4 from "../assets/team/c4.jpg";
import c5 from "../assets/team/c5.jpg";
import c6 from "../assets/team/c6.jpg";
import c7 from "../assets/team/c7.jpg";
import c8 from "../assets/team/c8.jpg";

const LOGOS = [
  { src: nsu, alt: "NSU Logo" },
  { src: arduino, alt: "Arduino Logo" },
  { src: spark, alt: "Spark Logo" },
  { src: esp32, alt: "ESP32 Logo" },
  { src: rasp, alt: "Raspberry Pi Logo" },
  { src: tinkercad, alt: "Tinkercad Logo" },
];

const teams = [
  { id: "team-1", name: "Herman Jensen", title: "Founder", img: c8 },
  { id: "team-2", name: "Steve Mark", title: "Chief Technical Officer", img: c7 },
  { id: "team-3", name: "Kenn Gallagher", title: "CEO", img: c6 },
  { id: "team-4", name: "Kenn Gallagher", title: "Marketing Manager", img: c5 },
  { id: "team-5", name: "Kenn Gallagher", title: "Intern", img: c4 },
];

const Partners = () => {
  return (
    <div className="w-full mt-20">
      {/* Core Team Section */}
      <div>
        <h1 className="text-center text-3xl font-semibold mb-10">Core Team</h1>
        <div className="flex flex-wrap justify-center gap-5 px-5">
          {teams.map((team) => (
            <div
              key={team.id}
              className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={team.img}
                alt={team.name}
                className="w-full h-50 object-cover rounded-t-lg"
              />
              <p className="pt-5 text-center font-semibold">{team.name}</p>
              <p className="text-center text-gray-500">{team.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Partners Section */}
      <div className="mt-20 mb-5">
        <h1 className="text-center text-3xl font-semibold mb-10">Our Partners</h1>
        <div className="relative mx-auto w-full sm:w-[80%] lg:w-[60%] overflow-hidden bg-white">
          <div className="animate-infinite-slider flex">
            {LOGOS.map((logo, index) => (
              <div
                className="flex-shrink-0 w-[100px] sm:w-[125px] lg:w-[150px] flex items-center justify-center"
                key={index}
              >
                <img src={logo.src} width={70} height={70} className="rounded-lg" alt={logo.alt} />
              </div>
            ))}
            {LOGOS.map((logo, index) => (
              <div
                className="flex-shrink-0 w-[100px] sm:w-[125px] lg:w-[150px] flex items-center justify-center"
                key={index}
              >
                <img src={logo.src} width={70} height={70} className="rounded-lg" alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;

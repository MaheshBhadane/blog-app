import Card from "@/components/card/Card";
import React from "react";

const Home = () => {
  return (
    <>
      <section>
        <div className="h-96 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 flex items-center">
          <div className="ml-20 w-100">
            <h2 className="text-white text-4xl font-serif">
              Richird Norton photorealistic rendering as real photos{" "}
            </h2>
            <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
              real photos
            </p>

            <a
              href="/sign-up"
              className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100"
            >
              Create New Blog
            </a>
          </div>
        </div>
      </section>
      <Card />
    </>
  );
};

export default Home;

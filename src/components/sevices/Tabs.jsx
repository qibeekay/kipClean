import { useEffect, useState } from "react";
import data from "./data.js"; // Assuming data holds the "services" array
import { FaArrowLeft, FaBars } from "react-icons/fa6"; // Import FaBars for menu icon

const Tabs = () => {
  const [currentDataIndex, setCurrentDataIndex] = useState(0); // Track current data index
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store selected location
  const [selectedService, setSelectedService] = useState(null); // State to store selected service
  const [activeCircles, setActiveCircles] = useState([true, false]); // State to store active circle indicators
  const [isSummaryVisible, setIsSummaryVisible] = useState(false); // State to manage summary visibility

  const handleLocationClick = (product) => {
    setSelectedLocation(product);
    setIsSummaryVisible(true);
    console.log("Updated selectedLocation:", product);
    // localStorage.setItem("selectedLocation", JSON.stringify(product));
  };

  const handleServiceClick = (product) => {
    setSelectedService((prevState) => {
      const newState = { ...prevState, ...product };
      setIsSummaryVisible(true);
      // localStorage.setItem("selectedService", JSON.stringify(product));
      console.log("Updated selectedService:", newState);
      return newState;
    });
  };

  // useEffect(() => {
  //   const storedLocation = localStorage.getItem("selectedLocation");
  //   const storedService = localStorage.getItem("selectedService");

  //   if (storedLocation) {
  //     setSelectedLocation(JSON.parse(storedLocation));
  //   }
  //   if (storedService) {
  //     setSelectedService(JSON.parse(storedService));
  //   }
  // }, []);

  const handleArrowClick = () => {
    setCurrentDataIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? 1 : 0;
      setActiveCircles((prevCircles) => {
        const newCircles = [...prevCircles];
        newCircles[newIndex] = true;
        return newCircles;
      });
      return newIndex;
    });
    // setSelectedLocation(null); // Reset selected location on data switch (optional)
    // setSelectedService(null); // Reset selected service on data switch
  };

  const toggleSummaryVisibility = () => {
    setIsSummaryVisible(!isSummaryVisible);
  };

  const currentData = data[currentDataIndex];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold uppercase">
        Book a service
      </h1>
      <div className="flex items-center justify-center w-fit rounded-xl border border-transparent">
        <div className="p-8 md:p-16 rounded-xl w-full flex h-[43rem]">
          <div className="bg-orange p-8 basis-[20%] flex items-center flex-col text-center gap-4 text-white">
            <div className="flex gap-8 pt-4">
              {data.map((item, index) => {
                console.log("Index:", index, "Is truthy? ", Boolean(index));
                console.log("Current data index:", currentDataIndex);
                console.log("Item index:", index);
                return (
                  <div
                    key={index}
                    className={`w-1 aspect-[1/1] rounded-full active-circle ${
                      activeCircles[index] ? "bg-black" : "bg-white"
                    }`}
                  ></div>
                );
              })}
            </div>

            <img src={currentData.banner} alt="" width={70} />
            <h1 className=" text-xl">{currentData.heading}</h1>
            <p className=" text-sm">{currentData.paragraph}</p>
            <div className="mt-[10rem]">
              <h1 className=" text-xl font-semibold">Got a question?</h1>
              <p className=" text-sm pt-3">
                Use the live chat or email <br />
                <span className="text-black font-bold">
                  bookings@kipclean.com
                </span>
              </p>
            </div>
          </div>
          <div className="bg-secondary p-4 basis-[40%] relative">
            {currentData.name === "Location" && (
              <>
                <h1>Select a location</h1>
                <hr />
                <div className="mt-8 flex flex-col gap-4 w-[100%] basis-[60%]">
                  {currentData.products.map((product, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer flex gap-4 border border-gray-400 rounded-lg px-2 py-1 w-full ${
                        selectedLocation === product ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleLocationClick(product)}
                    >
                      <img src={product.img} alt="" width={50} />
                      <p className="w-full">{product.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            {currentData.name === "Service" && (
              <>
                <h1>Select a service</h1>
                <hr />
                <div className="mt-8 flex flex-col gap-4 w-[100%] basis-[60%]">
                  {currentData.products.map((product, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer flex gap-4 border border-gray-400 rounded-xl px-2 py-2 w-full items-center ${
                        selectedService === product ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleServiceClick(product)}
                    >
                      <img src={product.img} alt="" width={50} />
                      <p className="w-full font-semibold">{product.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            <hr className="mt-4" />
            <div className="flex justify-between items-center cursor-pointer absolute bottom-[10px]">
              <div className={`${currentDataIndex > 0 ? "block" : "hidden"}`}>
                <FaArrowLeft onClick={handleArrowClick} />
              </div>
              <div onClick={handleArrowClick}>Proceed</div>
            </div>
          </div>
          <div className="md:hidden p-4">
            <button
              onClick={toggleSummaryVisibility}
              className="bg-orange text-white p-2 rounded-lg"
            >
              <FaBars />
            </button>
          </div>
          {(selectedLocation || selectedService) && (
            <div
              className={`bg-orange p-4 transition-transform duration-300 ${
                isSummaryVisible ? "block" : "hidden"
              } md:block`}
            >
              <h1>Summary</h1>
              {selectedLocation && ( // Display location details if selected
                <h2>LOCATION................ {selectedLocation.name}</h2>
              )}
              {Boolean(selectedService) && ( // Display service details if selected
                <h2>SERVICES................ {selectedService.name}</h2>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
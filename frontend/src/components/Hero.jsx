import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const NewsCard = ({ data }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    function findImage() {
      if (data.pages && Array.isArray(data.pages)) {
        for (let i = 0; i < data.pages.length; i++) {
          if (data.pages[i].originalimage) {
            setImage(data.pages[i].originalimage.source);
            break;
          }
        }
      }
    }

    findImage();
  }, [data.pages]);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={image || "https://via.placeholder.com/345x230"}
          alt={data.title || "News Image"}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.text || "No title available"}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.description || "No description available"}
        </p>
        <a
          href={data.link || "#"}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const Hero = () => {
  const [data, setData] = useState([]);
  const onThisDayRef = useRef(null);

  const scrollToBottom = () => {
    window.scrollTo({
      top: window.screen.height,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    gsap.fromTo(
      "#image1",
      { x: -550 },
      { x: 0, duration: 2, ease: "power3.out", delay: 5 }
    );

    const today = new Date();
    const date = today.getDate();
    const mon = today.getMonth() + 1;

    fetch("http://localhost:5000/date/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, mon }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error || "An unknown error occurred");
          });
        }
        return response.json();
      })
      .then((data) => {
        setData(data.selected);
        console.log(data.selected);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    // Animate "On This Day Today" when it enters the viewport
    gsap.fromTo(
      onThisDayRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: onThisDayRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="">
      <div className="h-screen w-full absolute left-0">
        <iframe
          src="https://lumalabs.ai/embed/9ec5306a-4bd3-46fe-9522-1f8a1281f6b3?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false"
          className="w-full h-full border-0"
          title="Content iframe"
        />
        <img
          style={{
            borderRadius: 10,
          }}
          id="image1"
          className="absolute top-14 left-0"
          src="/logo1.png"
        />
      </div>
      <div className="h-screen"></div>

      <button
        onClick={scrollToBottom}
        className="absolute bottom-16 right-8 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        aria-label="Scroll to bottom"
      >
        Scroll Down
      </button>

      {/* "On This Day Today" Section */}
      <div
        ref={onThisDayRef}
        className="bg-blue-100 text-blue-900 p-6 rounded-lg shadow-md mb-6 mx-6"
      >
        <h2 className="text-3xl font-bold mb-2">On This Day Today</h2>
        <p className="text-lg">
          Discover remarkable events, notable birthdays, and historical
          milestones that happened on this day in history.
        </p>
      </div>
      {/* "On This Day Today" Section */}
      <div
        // ref={onThisDayRef}
        className="bg-blue-100 text-blue-900 p-6 rounded-lg shadow-md mb-6 mx-6"
      >
        <h2 className="text-3xl font-bold mb-2">On This Day Today</h2>
        <p className="text-lg">
          Discover remarkable events, notable birthdays, and historical
          milestones that happened on this day in history.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {data.map((e, index) => (
          <NewsCard key={index} data={e} />
        ))}
      </div>
    </div>
  );
};

export default Hero;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

const PhotoCarousel = ({ length, index, place }) => {
  const [dps, setDps] = useState([]);

  useEffect(() => {
    setDps(Array(length).fill(0));
  }, [length, setDps]);

  const viewNextPhoto = (noOfPhotos, index) => {
    if (dps[index] !== noOfPhotos - 1) {
      setDps(
        dps.map((val, i) => {
          if (i === index) return val + 1;
          else return val;
        })
      );
    }
  };

  const viewPrevPhoto = (index) => {
    if (dps[index] !== 0) {
      setDps(
        dps.map((val, i) => {
          if (i === index) return val - 1;
          else return val;
        })
      );
    }
  };

  return (
    <div className="relative group">
      <Link to={`/place/${place._id}`}>
        <div className="duration-700 ease-in-out">
          <img
            className="rounded-2xl transition duration-1000 aspect-square object-cover "
            src={`http://localhost:4000/uploaded-photos/${
              place.photos[dps[index]]
            }`}
            alt=""
          />
        </div>
      </Link>
      <div className="absolute bottom-[45%] flex justify-between w-[100%] overflow-hidden h-0 group-hover:h-auto px-4">
        <button
          style={{ opacity: dps[index] === 0 ? 0 : "" }}
          onClick={() => viewPrevPhoto(index)}
          className="p-1 bg-white opacity-80 hover:opacity-100 rounded-full"
        >
          <IoIosArrowBack />
        </button>
        <button
          style={{ opacity: dps[index] === place.photos.length - 1 ? 0 : "" }}
          onClick={() => viewNextPhoto(place.photos.length, index)}
          className="p-1 bg-white opacity-80 hover:opacity-100 rounded-full"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default PhotoCarousel;

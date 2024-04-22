/* eslint-disable react/prop-types */
import PerksElement from "../components/PerksElement";
import { IoWifi } from "react-icons/io5";
import { LuParkingCircle } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { LuDoorOpen } from "react-icons/lu";
import { PiRadio } from "react-icons/pi";

const Perks = ({ selectedPerks, onChange }) => {
  const handleCheckBoxClick = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      onChange([...selectedPerks, name]);
    } else {
      onChange([...selectedPerks.filter((perk) => perk != name)]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl ml-2 mt-10">Perks</h2>
      <p className="text-sm text-gray-600 ml-2 mb-1">Select perks offered</p>

      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        <PerksElement
          onChange={handleCheckBoxClick}
          checked={selectedPerks.includes("wifi")}
          name="wifi"
          perk="Wifi"
          icon={<IoWifi />}
        />
        <PerksElement
          onChange={handleCheckBoxClick}
          checked={selectedPerks.includes("parking")}
          name="parking"
          perk="Free Parking"
          icon={<LuParkingCircle />}
        />
        <PerksElement
          onChange={handleCheckBoxClick}
          checked={selectedPerks.includes("pets")}
          name="pets"
          perk="Pets"
          icon={<MdPets />}
        />
        <PerksElement
          onChange={handleCheckBoxClick}
          checked={selectedPerks.includes("tv")}
          name="tv"
          perk="TV"
          icon={<PiTelevisionSimpleDuotone />}
        />
        <PerksElement
          onChange={handleCheckBoxClick}
          checked={selectedPerks.includes("radio")}
          name="radio"
          perk="Radio"
          icon={<PiRadio />}
        />
        <PerksElement
          onChange={handleCheckBoxClick}
          checked={selectedPerks.includes("entrance")}
          name="entrance"
          perk="Private Entrance"
          icon={<LuDoorOpen />}
        />
      </div>
    </div>
  );
};

export default Perks;

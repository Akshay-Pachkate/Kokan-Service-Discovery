/* eslint-disable react/prop-types */
import { IoWifi } from "react-icons/io5";
import { LuParkingCircle } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { LuDoorOpen } from "react-icons/lu";
import { PiRadio } from "react-icons/pi";
import PerksElement from "./PerksElement";

const PerksToDisplay = ({ perks }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold my-4">Perks</h1>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 justify-center">
        <PerksElement
          perkNotAvai={(perks?.includes("wifi")) ? "" : " line-through "}
          checkBox={" hidden "}
          perk="Wifi"
          icon={<IoWifi />}
        />
        {/* <h1>{(perks?.includes("parking")) ? "" : " line-through "}</h1> */}
        <PerksElement
          perkNotAvai={(perks?.includes("parking")) ? "" : " line-through "}
          checkBox={" hidden "}
          perk="Free Parking"
          icon={<LuParkingCircle />}
        />
        <PerksElement
          perkNotAvai={(perks?.includes("pets")) ? "" : " line-through "}
          checkBox={" hidden "}
          perk="Pets"
          icon={<MdPets />}
        />
        <PerksElement
          perkNotAvai={(perks?.includes("tv")) ? "" : " line-through "}
          checkBox={" hidden "}
          perk="TV"
          icon={<PiTelevisionSimpleDuotone />}
        />
        <PerksElement
          perkNotAvai={(perks?.includes("radio")) ? "" : " line-through "}
          checkBox={" hidden "}
          perk="Radio"
          icon={<PiRadio />}
        />
        <PerksElement
          perkNotAvai={(perks?.includes("entrance")) ? "" : " line-through "}
          checkBox={" hidden "}
          perk="Private Entrance"
          icon={<LuDoorOpen />}
        />
      </div>
    </div>
  );
};

export default PerksToDisplay;

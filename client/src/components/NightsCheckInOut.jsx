/* eslint-disable react/prop-types */
import { IoCloudyNightOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import { FaLongArrowAltRight } from "react-icons/fa";

const NightsCheckInOut = ({checkIn, checkOut, nights, checkInOutOnNextLine}) => {
  const nextLine = checkInOutOnNextLine ? "" : " flex "
  return (
    <div>
        <span className={"gap-2 items-center justify-start " + nextLine}>
        <span className="flex items-center justify-start text-lg gap-1"><IoCloudyNightOutline className="text-xl"/> {nights} nights:</span>
          <span className="flex items-center gap-2">
            <span className="flex items-center text-lg gap-1"><SlCalender/> {format(new Date(checkIn), 'dd-mm-yyyy')}</span>
              <FaLongArrowAltRight/>
            <span className="flex items-center text-lg gap-1"><SlCalender/> {format(new Date(checkOut), 'dd-mm-yyyy')}</span>
          </span>
        
        </span>
        
    </div>
  )
}

export default NightsCheckInOut
/* eslint-disable react/prop-types */
import { IoLocationOutline } from "react-icons/io5";

const AddressLink = ({address}) => {
  return (
    <div>
        <a
          className="text-sm underline font-bold flex gap-2 items-center mt-2"
          target="_blank"
          rel="noreferrer"
          href={"https://maps.google.com/?q=" + address}
        >
          <IoLocationOutline/>
          {address}
        </a>
    </div>
  )
}

export default AddressLink
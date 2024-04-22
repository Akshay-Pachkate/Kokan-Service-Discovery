/* eslint-disable react/prop-types */


const CheckInOutMaxGuests = ({checkIn, checkOut, MaxGuests, description}) => {
  return (
    <div>
        <div><h2 className="text-2xl font-semibold mb-4">Description</h2>
        {description}</div>
        <div className="mt-4 py-2">
        Check In Time: {checkIn} <br />
        Check Out Time: {checkOut} <br/>
        Max number of Guests: {MaxGuests}
        </div>
    </div>
  )
}

export default CheckInOutMaxGuests
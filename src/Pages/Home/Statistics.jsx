import { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const countParcel = async () => {
      await axiosSecure
        .get("/users/admin/bookings")
        .then((res) => setParcels(res.data));
    };
    countParcel();
    const countUser = async () => {
      await axiosSecure
        .get("/users/admin")
        .then((res) => setUsers(res.data));
    };
    countUser();
  }, [axiosSecure]);

const delivered = parcels.filter((item)=>item.status === "delivered")


  return (
    <div className=" flex justify-center  items-center ">
     <div className="grid grid-cols-1 sm:grid-cols-3 justify-center items-center gap-10">
     <div className="card w-96 bg-gradient-to-t from-[#ffa628] shadow-xl to-[#fe4504] text-white ">
        <div className="card-body">
          <div className="text-6xl font-bold flex justify-center ">
            {" "}
            <CountUp start={0} end={parcels.length} duration={30}></CountUp>
          </div>
          <h2 className="card-title justify-center ">Parcel Booked</h2>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card w-96 bg-[]  bg-gradient-to-t from-[#60ffe7] shadow-xl to-[#00CED1] text-white  ">
        <div className="card-body">
          <div className="text-6xl font-bold flex justify-center">
            {" "}
            <CountUp start={0} end={delivered.length} duration={30}></CountUp>
          </div>
          <h2 className="card-title justify-center">Parcel Delivered</h2>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
      <div className="card w-96 bg-gradient-to-t from-[#ffa628] shadow-xl to-[#fe4504] text-white">
        <div className="card-body">
          <div className="text-6xl font-bold flex justify-center">
            {" "}
            <CountUp start={0} end={users.length} duration={30}></CountUp>
          </div>
          <h2 className="card-title justify-center">Registered Users</h2>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Statistics;

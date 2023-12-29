
import axios from "axios";
import { useEffect, useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const OurFeatures = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('featuresData.json')
    .then(res => setData(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-16">
      {/* <h1 className="text-4xl font-bold text-center mb-10">Our Features</h1> */}
      <SectionTitle heading={"Our Features"} subHeading={"Our Strength"}/>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {data?.map((card) => (
          <div className="flex justify-between  gap-3 border p-3" key={card?.id}>
            <div className="">
              <img src={card?.img} alt="" className="w-[77px] h-[77px]" />
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold ">{card?.title}</h2>
              <div className="w-20 h-1 bg-orange-300"></div>
              <p className="text-justify">{card?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurFeatures;

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";


const AllParcelsModal = () => {
  const { register, handleSubmit, watch } = useForm();
  const axiosSecure = useAxiosSecure();


  const { data: deliveryMen = [], refetch } = useQuery({
    queryKey: ["deliveryMen"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/admin");
      return res.data;
    },
  });
  const onSubmit = async (data) => {
    
    const deliMenEmail = deliveryMen.find((deliMan) => deliMan._id === data.selectedDeliveryMen);
      // console.log(deliMenEmail)
      let flag=0;
    const info = {
      role: "deliveryMen",
    };
     await axiosSecure.patch(`/users/${deliMenEmail.email}`, info).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount>0) {
        flag++;
      }
    });
    
    await axiosSecure.patch(`/users/bookings/${data.selectedDeliveryMen}`,{approximateDeliveryDate: data.approximateDeliveryDate}).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount>0) {
        flag++;
      }
    });
    if (flag==2) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Process completed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal text-black">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl mb-5">Assign Delivery Man</h3>
            <div className="space-y-3">
              <div className="flex justify-center items-center">
                <div className="flex flex-col ">
                  <label htmlFor="deliveryMen" className="text-base text-left">
                    Delivery Man:
                  </label>
                  <select
                    {...register("selectedDeliveryMen")}
                
                    id="deliveryMen"
                    name="selectedDeliveryMen"
                    className="select select-bordered w-full sm:w-[430px]"
                    //   value={selectedDeliveryMen}
                  >
                    {/* Map through the delivery men array and create options */}
                    <option disabled selected>
                      Pick one
                    </option>
                    {deliveryMen?.map((deliMan) => (
                      <option key={deliMan._id} value={deliMan._id} >
                        {deliMan.name} - {deliMan._id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="flex flex-col ">
                  <label htmlFor="deliveryDate" className="text-base text-left">
                    Approximate Delivery Date:
                  </label>
                  <input
                    {...register("approximateDeliveryDate")}
                    placeholder="Type here"
                    className="input input-bordered w-full sm:w-[430px]"
                    type="date"
                    name="approximateDeliveryDate"
                    id="deliveryDate"
                    // value={deliveryDate}
                    // onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                //   onClick={handleAssign}
                className="btn btn-primary "
              >
                Assign
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AllParcelsModal;

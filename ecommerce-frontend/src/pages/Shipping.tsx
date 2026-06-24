import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import {  CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState, server } from "@/redux/store";
import { saveShippingInfo } from "@/redux/reducer/cartReducer";
import toast from "react-hot-toast";

const AddressForm: React.FC = () => {
  const { cartItems, coupon } = useSelector(
    (state: RootState) => state.cartReducer
  );
  const { user } = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create?id=${user?._id}`,
        {
          items: cartItems,
          shippingInfo,
          coupon,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/payment", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) navigate("/cart");
  }, [cartItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-12">
        <Breadcrumb pageName="cart" currentPage="Shipping" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="space-y-6 md:pr-8">
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

          <form className="space-y-4 flex flex-col" onSubmit={submitHandler}>
            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <input
                required
                type="text"
                name="address"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                required
                type="text"
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">State</label>
              <input
                required
                type="text"
                placeholder="State"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Country</label>
              <select
                name="country"
                required
                value={shippingInfo.country}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">PIN Code</label>
              <input
                required
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                value={shippingInfo.pinCode}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit" // Add type="submit"
                className="w-full flex items-center justify-center gap-2"
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Payment
              </Button>
            </motion.div>
          </form>
        </div>
        {/* 
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[600px] relative rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center"
          >
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Your Location</span>
          </motion.div>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default AddressForm;

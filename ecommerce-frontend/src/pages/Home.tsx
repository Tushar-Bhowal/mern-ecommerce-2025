import ProductCard from "@/components/Shared/ProductCard";
import { Link } from "react-router-dom";
import video from "../assets/branding.mp4";
import { WobbleCard } from "@/components/Shared/WobbleCard";
import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/Shared/DirectionAwareHover";
import men from "/men.png";
import women from "/women.png";
import { useLatestProductsQuery } from "@/redux/api/productApi";
import toast from "react-hot-toast";
import { ProductSkeleton } from "@/components/Shared/Loader";
import { CartItem } from "@/types/types";
import { addToCart } from "@/redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  useEffect(() => {
    if (isError) toast.error("Cannot Fetch the Products");
  }, [isError]);

  return (
    <div>
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      </section>

      <section className="mt-10 p-5">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-black-heading uppercase text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora-bold">
            Elevating Your Style Game
          </h1>
          <p className="text-gray-500 text-center text-xs sm:text-md md:text-lg md:w-1/2">
            Discover the Perfect Blend of Comfort and Trend with Our Exclusive
            Collection. Explore Deals on Jeans, Sneakers, and More!
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
              navigateTo="/category/jeans"
            >
              <div className="max-w-xs">
                <h2 className="text-left uppercase text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Jeans
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  Style and comfort meet in our collection of jeans. Discover
                  the latest trends and perfect cuts for an impeccable look.
                </p>
              </div>
              <img
                src="/jeans.png"
                alt="jeans image"
                className="absolute w-1/2 h-full -right-4 lg:-right-[10%] grayscale filter  md:-bottom-2 object-contain rounded-2xl"
              />
            </WobbleCard>

            <WobbleCard
              containerClassName="col-span-1 min-h-[300px]"
              navigateTo="/category/t-shirt"
            >
              <div className="max-w-xs">
                <h2 className="text-left uppercase text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  T-Shirts
                </h2>
                <p className="mt-2 max-w-[26rem] text-left text-base/6 text-neutral-200">
                  Experience casual comfort and effortless style with our
                  versatile t-shirt collection.
                </p>
              </div>
              <img
                src="/tshirt.avif"
                alt="jeans image"
                className="absolute w-1/2 h-full -right-4 lg:right-[22%] grayscale filter -bottom-28 md:-bottom-28 object-contain rounded-2xl"
              />
            </WobbleCard>

            <WobbleCard
              containerClassName="col-span-1 min-h-[300px]"
              navigateTo="/category/shirts"
            >
              <div className="max-w-xs">
                <h2 className="text-left uppercase text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Shirts
                </h2>
                <p className="mt-2 max-w-[26rem] text-left text-base/6 text-neutral-200">
                  Discover refined style and unmatched comfort with our latest
                  shirt collection.
                </p>
              </div>
              <img
                src="/shirts.avif"
                alt="jeans image"
                className="absolute w-1/2 h-full -right-4 lg:right-[22%] grayscale filter -bottom-28 md:-bottom-28 object-contain rounded-2xl"
              />
            </WobbleCard>

            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 bg-green-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
              navigateTo="/category/footwears"
            >
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Footwears
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                  Step into style and comfort with our trendy footwear
                  collection, perfect for any occasion.
                </p>
              </div>
              <img
                src="/footwears.png"
                width={400}
                height={400}
                alt="linear demo image"
                className="absolute -right-10 md:-right-[0%] -bottom-10 object-contain rounded-2xl"
              />
            </WobbleCard>
          </div>
        </div>
      </section>

      <section className="mt-16 p-5">
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-black-heading uppercase text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora-bold">
            TRENDING NOW
          </h1>
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="mt-6 flex gap-6 flex-wrap">
            {isLoading ? (
              <ProductSkeleton />
            ) : (
              data?.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photos={i.photos}
                />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="mt-16 p-5">
        <div className="flex max-w-7xl mx-auto w-full flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-black-heading uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sora-bold">
            Shop now
          </h1>
          <Link to="/search">
            <Button className="bg-green-150 hover:bg-green-150/90 sm:h-12 sm:w-44 text-md md:text-2xl uppercase">
              Shop
            </Button>
          </Link>
        </div>
        <div className="md:h-[40rem] relative flex items-center justify-center gap-4 max-w-7xl mx-auto w-full">
          <DirectionAwareHover imageUrl={men} navigateTo="/gender/male">
            <p className="font-bold text-2xl uppercase">Male</p>
          </DirectionAwareHover>

          <DirectionAwareHover imageUrl={women} navigateTo="/gender/female">
            <p className="font-bold text-2xl uppercase">Female</p>
          </DirectionAwareHover>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { useLocation } from "react-router-dom";

const NewsLetter = () => {
  const location = useLocation();
  // Hidden on admin and the auth page (login is a self-contained, full-height screen).
  const isHidden =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login";
  return (
    <>
      {!isHidden && (
        <section className="mt-20">
          <div className="bg-green-150 p-6 md:p-12 ">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-4 md:mb-0">
                <h2 className="text-2xl md:text-4xl font-bold">
                  Sign up to our newsletter
                </h2>
                <p className="text-xl md:text-2xl">& get 20% off</p>
              </div>
              <button className="bg-white text-black px-8 py-3 rounded hover:bg-gray-100 transition-colors">
                SIGN UP FOR FREE
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default NewsLetter;

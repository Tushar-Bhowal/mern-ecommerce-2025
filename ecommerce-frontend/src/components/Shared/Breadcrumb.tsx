import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface BreadcrumbProps {
  pageName: string;
  currentPage: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageName, currentPage }) => {
  // Variants for different animation states
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="w-full md:h-80 flex flex-col items-center justify-center p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl sm:text-6xl lg:text-8xl text-black-heading font-sora-semibold mb-4 uppercase"
        variants={itemVariants}
      >
        {currentPage}
      </motion.h1>

      <motion.div
        className="flex items-center gap-2 text-md"
        variants={itemVariants}
      >
        <Link
          to={pageName === "Home" ? "/" : `/${pageName}`}
          className="text-gray-600 hover:underline transition-colors"
        >
          {pageName}
        </Link>

        <FaAngleRight className="text-gray-400" />

        <span className="text-green-150">{currentPage}</span>
      </motion.div>
    </motion.div>
  );
};

export default Breadcrumb;

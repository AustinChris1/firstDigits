import { ChevronDown, ChevronRight } from "lucide-react"; // Adjust based on your icon library
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const DropdownMenu = ({
    title,
    items,
    links,
    dropdownOpen,
    section,
    handleDropdownToggle,
    dropdownRef,
    handleNavigation,
}) => (
    <li
        className="relative cursor-pointer text-blue-800 hover:text-blue-600 group dark:text-blue-200 dark:hover:text-blue-400"
        aria-haspopup="true"
        aria-expanded={dropdownOpen === section}
    >
        {/* Title with Icons */}
        <div
            className="flex items-center gap-1 px-2 py-2 text-lg transition-all ease-in-out duration-200 hover:text-blue-700 dark:hover:text-blue-300"
            onClick={() => handleDropdownToggle(section)}
        >
            <span>{title}</span>
            {/* Mobile Icon */}
            <span className="inline-block text-xl md:hidden">
                <ChevronRight />
            </span>
            {/* Desktop Icon */}
            <span className="hidden text-xl md:inline-block">
                <ChevronDown />
            </span>
        </div>

        {/* Underline effect on hover */}
        <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 dark:bg-blue-200"></div>

        <AnimatePresence>
            {dropdownOpen === section && (
                <motion.ul
                    ref={dropdownRef}
                    initial={{
                        opacity: 0,
                        y: window.matchMedia("(min-width: 768px)").matches ? -10 : 0,
                        x: window.matchMedia("(min-width: 768px)").matches ? 0 : "100%",
                    }} // Desktop: drop-down, Mobile: slide-in
                    animate={{
                        opacity: 1,
                        y: window.matchMedia("(min-width: 768px)").matches ? 0 : 0,
                        x: window.matchMedia("(min-width: 768px)").matches ? 0 : 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: window.matchMedia("(min-width: 768px)").matches ? -10 : 0,
                        x: window.matchMedia("(min-width: 768px)").matches ? 0 : "100%",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`z-50 bg-slate-200 dark:bg-gray-800 rounded-md shadow-lg md:absolute md:top-full md:left-0 md:w-auto md:h-auto md:rounded-md md:shadow-lg ${dropdownOpen
                            ? "fixed inset-0 w-full h-full p-4 md:static md:p-0"
                            : ""
                        }`}
                    role="menu"
                >
                    {/* Mobile Header with Close Button */}
                    <div className="flex justify-between items-center mb-4 md:hidden">
                        <span className="text-xl font-bold text-blue-800 dark:text-blue-200">
                            {title}
                        </span>
                        <button
                            className="text-blue-800 hover:text-blue-600 dark:text-blue-200 dark:hover:text-blue-400"
                            onClick={() => handleDropdownToggle(null)} // Close dropdown
                        >
                            ✕
                        </button>
                    </div>

                    {/* Menu Items */}
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="p-2 md:py-2 md:bg-white hover:md:bg-blue-800 hover:md:text-white transition-all cursor-pointer dark:md:bg-gray-800 dark:hover:md:bg-blue-600 dark:hover:md:text-white"
                            role="menuitem"
                        >
                            <Link
                                to={links[index]}
                                className="block w-full py-2 px-2 text-blue-800 dark:text-blue-200 hover:text-white dark:hover:text-white"
                                onClick={() => {
                                    handleNavigation(links[index]);
                                    handleDropdownToggle(null); // Close dropdown after navigation
                                }}
                            >
                                {item}
                            </Link>
                        </li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    </li>
);

export default DropdownMenu;

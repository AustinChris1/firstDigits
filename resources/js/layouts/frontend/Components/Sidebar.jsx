import React, { useEffect, useState, useCallback } from "react";
import { Clock, Share2, ArrowUp, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const [history, setHistory] = useState([]);
    const [showTooltip, setShowTooltip] = useState(false);
    const location = useLocation(); // Tracks the current route
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        // Apply the initial theme
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };


    // Function to update visited pages in localStorage
    const updateVisitedPages = () => {
        const pageTitle = document.title;
        const pageUrl = window.location.href;

        // Fetch existing visited pages or initialize as empty
        const visitedPages = JSON.parse(localStorage.getItem("visitedPages")) || [];
        const currentPage = { title: pageTitle, url: pageUrl };

        // Ensure only pages from the current domain are included
        const domain = window.location.origin;
        const filteredPages = visitedPages.filter((page) =>
            page.url.startsWith(domain)
        );

        // Prevent duplicates for the same page URL
        if (!filteredPages.some((page) => page.url === pageUrl)) {
            filteredPages.push(currentPage);
            localStorage.setItem("visitedPages", JSON.stringify(filteredPages));
        }

        // Update the history state with the last 5 pages
        setHistory(filteredPages.slice(-5));
    };

    // Update visited pages whenever the route changes
    useEffect(() => {
        updateVisitedPages();
    }, [location]);

    const handleRecentlyViewedClick = () => {
        setShowTooltip((prev) => !prev); // Toggle tooltip visibility on button click
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing page:", error);
            }
        } else {
            console.warn("Share API is not supported on this browser.");
        }
    };

    const handleClickOutside = useCallback((event) => {
        if (
            showTooltip &&
            !event.target.closest(".tooltip-container") &&
            !event.target.closest(".recently-viewed-btn")
        ) {
            setShowTooltip(false); // Close the tooltip if clicked outside
        }
    }, [showTooltip]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [handleClickOutside]);

    return (
        <div className="fixed top-1/3 z-20 right-4 flex flex-col items-center space-y-2">
            {/* Recently Viewed Button */}
            <div className="relative">
                <button
                    onClick={handleRecentlyViewedClick}
                    className="recently-viewed-btn bg-gray-200 text-gray-700 rounded-full p-2 shadow hover:bg-gray-300"
                    title="Recently Viewed"
                >
                    <Clock size={20} />
                </button>

                {/* Tooltip showing recently viewed pages */}
                {showTooltip && (
                    <div className="tooltip-container absolute right-full top-1/2 transform translate-x-2 -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 rounded-md shadow-md p-3 text-sm flex flex-col w-48 z-20">
                        <p className="font-bold mb-2">Recently Viewed:</p>
                        <ul className="space-y-1">
                            {history.length > 0 ? (
                                [...history]
                                    .reverse() // Reverse to show the most recent first
                                    .map((page, index) => (
                                        <li key={index}>
                                            <Link
                                                to={page.url}
                                                className="text-blue-500 hover:underline dark:text-blue-400"
                                                title={page.title}
                                            >
                                                {page.title}
                                            </Link>
                                        </li>
                                    ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-600">No recently viewed pages.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Share Button */}
            <button
                onClick={handleShare}
                className="bg-gray-200 text-gray-700 rounded-full p-2 shadow hover:bg-gray-300"
                title="Share Page"
            >
                <Share2 size={20} />
            </button>

            {/* Scroll to Top Button */}
            <button
                onClick={handleScrollToTop}
                className="bg-gray-200 text-gray-700 rounded-full p-2 shadow hover:bg-gray-300"
                title="Scroll to Top"
            >
                <ArrowUp size={20} />
            </button>
            {/* Toggle Dark/Light Mode Button */}
            <button
                onClick={toggleDarkMode}
                className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-full p-2 shadow hover:bg-gray-300 dark:hover:bg-gray-600"
                title="Toggle Light/Dark Mode"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
    );
};

export default Sidebar;

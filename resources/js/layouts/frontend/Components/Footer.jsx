import React from 'react';
import ig from "../assets/social/instagram.svg";
import x from "../assets/social/x.svg";
import fb from "../assets/social/facebook.svg";
import phone from "../assets/social/phone.svg";

const iframeSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126091.50068803449!2d7.481260032478743!3d9.030942164225989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b964ec887e5%3A0x12a34843356767e8!2sNimota%20Plaza!5e0!3m2!1sen!2sng!4v1726406738672!5m2!1sen!2sng";

const Iframe = ({ src }) => (
    <div className="w-full h-64 sm:h-80">
        <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Location"
        ></iframe>
    </div>
);

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-200 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row justify-between p-6 mb-4 sm:p-10">
                <div className="flex flex-col gap-4">
                    <div>                
                        <h1 className="text-lg font-semibold text-blue-800 dark:text-white animate__animated animate__fadeIn animate__delay-1s">Address</h1>
                        <p className="text-blue-800 dark:text-gray-300 animate__animated animate__fadeIn animate__delay-2s">
                            Suite 011, Nimota Plaza, Plot 855, Tafawa Balewa Way, Area 11, Garki Abuja, Nigeria
                        </p>
                    </div>
                    <div>                
                        <h1 className="text-lg font-semibold text-blue-800 dark:text-white animate__animated animate__fadeIn animate__delay-3s">Contact</h1>
                        <p className="text-blue-800 dark:text-gray-300 animate__animated animate__fadeIn animate__delay-4s">
                            Email: <a href="mailto:fdcdevs2024@gmail.com" className="text-blue-800 dark:text-blue-400">fdcdevs2024@gmail.com</a>
                        </p>
                        <p className="text-blue-800 dark:text-gray-300 animate__animated animate__fadeIn animate__delay-5s">
                            Phone: <a href="tel:+2347052500468" className="text-blue-800 dark:text-blue-400">0705 250 0468</a>, <a href="tel:+2348163378811" className="text-blue-800 dark:text-blue-400">0816 337 8811</a>
                        </p>
                    </div>
                </div>
                <Iframe src={iframeSrc} />
            </div>

            <div className="flex flex-row justify-center items-center gap-6 py-4 animate__animated animate__fadeIn animate__delay-6s">
                <a href="https://x.com" className="transition-transform transform hover:scale-125 hover:rotate-12 dark:hover:scale-110 dark:hover:rotate-6" title="Twitter">
                    <img src={x} alt="Xicon" className='w-8 h-8' />
                </a>
                <a href="https://instagram.com/firstdigits" className="transition-transform transform hover:scale-125 hover:rotate-12 dark:hover:scale-110 dark:hover:rotate-6" title="Instagram">
                    <img src={ig} alt="IGicon" className='w-8 h-8' />
                </a>
                <a href="https://" className="transition-transform transform hover:scale-125 hover:rotate-12 dark:hover:scale-110 dark:hover:rotate-6" title="Facebook">
                    <img src={fb} alt="FBicon" className='w-8 h-8' />
                </a>
                <a href="tel:+2347052500468" className="transition-transform transform hover:scale-125 hover:rotate-12 dark:hover:scale-110 dark:hover:rotate-6" title="Phone">
                    <img src={phone} alt="PhoneIcon" className='w-8 h-8' />
                </a>
            </div>

            <div className="flex flex-col sm:flex-row text-center justify-center gap-4 sm:gap-10 py-5 animate__animated animate__fadeIn animate__delay-7s">
                <p className="text-sm text-gray-500 dark:text-gray-300">Copyright &copy; {year} All rights reserved.</p>
                <p className="text-sm text-blue-800 dark:text-blue-400 hover:underline cursor-pointer">Terms of Use</p>
                <p className="text-sm text-blue-800 dark:text-blue-400 hover:underline cursor-pointer">Privacy Notice</p>
            </div>
        </footer>
    );
}

export default Footer;

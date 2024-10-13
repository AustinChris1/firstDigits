import React from 'react'
import ig from "../assets/social/instagram.svg";
import x from "../assets/social/x.svg";
import fb from "../assets/social/facebook.svg";
import phone from "../assets/social/phone.svg";

const iframe = "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126091.50068803449!2d7.481260032478743!3d9.030942164225989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b964ec887e5%3A0x12a34843356767e8!2sNimota%20Plaza!5e0!3m2!1sen!2sng!4v1726406738672!5m2!1sen!2sng' width='300' height='300' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>";

function Iframe(props) {
    return (<div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }} />);
}

var currentTime = new Date()
var year = currentTime.getFullYear()
const Footer = () => {
    return (
        <footer className='bg-gray-200'>

            <div className="flex flex-col sm:flex-row justify-evenly p-10">
                <div className="flex flex-col gap-4 break-words">
                    <div>                
                        <h1>Address</h1>
                        <p className="text-blue-800"> Suite 011, Nimota Plaza, Plot 855, Tafawa Balewa way, Area 11, Garki Abuja, Nigeria</p>

                    </div>
                    <div>                
                        <h1>Contact</h1>
                        <p className="text-blue-800">Email: fdcdevs2024@gmail.com</p>
                        <p className="text-blue-800">07052500468</p>
                        <p className="text-blue-800">08163378811</p>
                    </div>
                </div>
                <Iframe iframe={iframe} className="w-80" />

            </div>
            <div className='flex flex-row justify-center'>
                <a href="https://x.com" className="p-5"><img src={x} alt="Xicon" className='w-8 h-8' />  </a>
                <a href="https://instagram.com/firstdigits" className="p-5"><img src={ig} alt="IGicon" className='w-8 h-8' />  </a>
                <a href="https://" className="p-5"><img src={fb} alt="Xicon" className='w-8 h-8' />  </a>
                <a href="tel:+2347052500468" className="p-5"><img src={phone} alt="Xicon" className='w-8 h-8' />  </a>
            </div>
            <div className="flex flex-col sm:flex-row text-center justify-center gap-10 pb-5">
            <p>Copyright &#169; All right reserved {year}</p>
            <p>Terms of use</p>
            <p>Privacy Notice</p>
            </div>
        </footer>
    )
}

export default Footer
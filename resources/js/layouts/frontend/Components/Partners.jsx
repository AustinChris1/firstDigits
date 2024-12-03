import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { X } from "lucide-react";
import Load from './Load';

const Partners = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`/api/team/view`)
      .then(res => {
        if (res.status === 200) {
          setTeams(res.data.teams);
        } else if (res.status === 401) {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        toast.error('Failed to fetch team.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
<div className="w-full py-10 dark:bg-gray-900">
  {/* Core Team Section */}
  <div>
    <h1 className="text-center text-4xl font-semibold mb-10 dark:text-white">Gallery</h1>
        {loading ? (
          <Load />
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="team-swiper px-5"
          >
            {teams.map((team) => (
              <SwiperSlide key={team.id}>
                <div
                  className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg transform hover:scale-105 dark:hover:bg-gray-700 transition-transform duration-300 ease-in-out"
                  onClick={() => openModal(`/${team.image}`)} // Open modal with selected image
                >
                  <img
                    src={`/${team.image}`}
                    alt={team.name}
                    className="w-full h-40 object-contain rounded-t-lg cursor-pointer"
                  />
                  <div className="pt-4 pb-2 text-center">
                    <p className="text-lg font-semibold dark:text-white">{team.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {team.role && team.role.toLowerCase() === 'group' ? '' : team.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeModal}>
          <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              onClick={closeModal}
            >
              <X/>
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;

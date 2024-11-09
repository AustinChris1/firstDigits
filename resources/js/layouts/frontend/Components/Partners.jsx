import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import LoadingSpinner from '../Components/Loader';

const Partners = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/team/view`)
      .then(res => {
        if (res.status === 200) {
          setTeams(res.data.teams);
        } else if (res.status === 401) {
          swal('Error', res.data.message, 'error');
        }
      })
      .catch(err => {
        swal('Error', 'Failed to fetch team.', 'error');
      })
      .finally(() => {
        setLoading(false); // This will be executed after the request, whether it succeeds or fails
      });
  }, []);

  return (
    <div className="w-full mt-20">
      {/* Core Team Section */}
      <div>
        <h1 className="text-center text-4xl font-semibold mb-10">Gallery</h1>
        {loading ? (
          <LoadingSpinner />
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
                <div className="p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
                  <img
                    src={`/${team.image}`}
                    alt={team.name}
                    className="w-full h-40 object-contain rounded-t-lg"
                  />
                  <div className="pt-4 pb-2 text-center">
                    <p className="text-lg font-semibold">{team.name}</p>
                    <p className="text-sm text-gray-500">{team.role && team.role.toLowerCase() === 'group' ? '' : team.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

    </div>
  );
};

export default Partners;

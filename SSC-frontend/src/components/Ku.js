import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTeam, fetchEvents } from '../reducers/kuReducer';
import kstyles from "./ku.module.css";
import ku_logo from "../images/ku_logo.jpg";
import Type from "./Typeku";
import { AiFillInstagram, AiFillLinkedin, AiFillMail, } from "react-icons/ai";

const Ku = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { team, events, loading, error } = useSelector((state) => state.kuReducer);

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    dispatch(fetchTeam());
    dispatch(fetchEvents());
    fetchCarouselImages();
  }, [dispatch]);
  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sliderImages/ku');
      setCarouselImages(response.data); // Assuming response.data is an array of image URLs
    } catch (error) {
      console.error('Error fetching carousel images:', error);
    }
  };
  const handleJoinClick = () => {
    window.location.href = 'https://chat.whatsapp.com/DVChQ1r0P70AbOzvFrGWDg';
  };

  const handleRegisterClick = (club, event) => {
    navigate(`/register/${club}/${event}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className={kstyles.bodies}>

      <div className={`${kstyles.carousel_container} `}>
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
           {carouselImages && carouselImages.length > 0 ? (
              carouselImages.map((carouselimage, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={`http://localhost:5000/${carouselimage.imageUrl.replace(/\\/g, '/')}`} alt="" />
                </div>
              ))
            ) : (
              <p>No carousel images found.</p>
            )}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <div className={kstyles.club_header}>
        <h2 className={kstyles.club_name}>Kashi Utkarsh </h2>
        <div className={kstyles.type}>
          {" "}<Type />{" "}
        </div>
      </div>

      <div className={`${kstyles.about} ${kstyles.container}`}>
        <img src={ku_logo} alt="" />
        <div className={kstyles.aboutContent}>
          <h3>About Us</h3>
          <p className={kstyles.dis}>
            Kashi Utkarsh, is an initiative led by the IIT BHU students to
            relieve the challenges faced by underprivileged individuals in areas
            like Patiya, Kakarmatta, and Lahartara. Centered on improved hygiene
            and importance of education, the initiative aims to enhance the
            standard of living and awareness among the less fortunate. Through
            individual engagement, free medical camps, and awareness
            campaigns,we strive to address their unique needs and nurture
            positive transformation within these communities.
          </p>
          <button onClick={handleJoinClick} className={`${kstyles.btn} ${kstyles.btnSecondary}`}>
            Join Us
          </button>
        </div>
      </div>

      <div className={kstyles.eventsBack}></div>
      <div className={`${kstyles.events} ${kstyles.container}`}>
        <h2>Events & Activities</h2>

        {events.map((event, index) => (
          <div className={kstyles.event} key={index}>
            <div className={kstyles.eventContent}>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
              <div className="home-btn">
                <button onClick={() => handleRegisterClick('ku', event.title)} className="home-getStartBtn" style={{ color: '#fff' }}>
                  Register Now
                </button>
              </div>
            </div>
            <img className={kstyles.img_ani} src={`http://localhost:5000/${event.image.replace(/\\/g, '/')}`} alt="" />
            <div className={kstyles.date}></div>
          </div>
        ))}
      </div>

      <div className={kstyles.home_container}>
          <h1 className={kstyles.heading}> Meet Our Team </h1>
          <div className={kstyles.row}>
          {team.map((member, index) => (
            <div className={kstyles.profile_card} key={index}>
              <div className={kstyles.img}>
                <img src={`http://localhost:5000/${member.image.replace(/\\/g, '/')}`} alt="" />
              </div>
              <div className={kstyles.caption}>
                <h3>{member.name}</h3>
                <p>{member.post}</p>
                <div className={kstyles.homePage_icons}>
                  <div className={kstyles.social_icons}>
                    <a href={member.instaLink}>
                      <AiFillInstagram />
                    </a>
                  </div>
                  <div className={kstyles.social_icons}>
                    <a href={member.facebookLink}>
                      <AiFillMail />
                    </a>
                  </div>
                  <div className={kstyles.social_icons}>
                    <a href={member.linkdinLink}>
                      <AiFillLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
    </div>
  );
};

export default Ku;

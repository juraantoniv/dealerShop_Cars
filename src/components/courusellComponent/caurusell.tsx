import React, { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { selectCars } from "../../store/store";

// other imports...

type ReactSlickProps = {
  callback?: () => void;
};

export const ReactSlickDemo = React.memo((props: ReactSlickProps) => {
  const cars = useSelector(selectCars);
  const [play, setPlay] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: play,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  // const onChangeHandler = () => {};
  //
  // const onPlayHandler = (item: boolean) => {
  //   setPlay(item);
  // };

  return (
    <div style={{ width: "70%", height: "150px" }}>
      <Slider key="slider-on" {...settings}>
        {cars?.data?.map((user) => (
          <div key={user?.brand}>
            <div>{user?.model}</div>
            <img
              src={user?.image}
              style={{ width: "20%" }}
              alt={user.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
});

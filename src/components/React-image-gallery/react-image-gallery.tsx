import "react-image-gallery/styles/css/image-gallery.css";

import { Box, Button, Card } from "@mui/material";
import React from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { useSelector } from "react-redux";

import { selectCars } from "../../store/store";

export const ReactImageGallery = () => {
  const cars = useSelector(selectCars);

  const items = cars?.data?.map((car) => {
    return {
      original: car?.image,
      description: car?.description,
      thumbnail: car?.image,
    };
  });
  return (
    <Box>
      <ImageGallery items={items ? (items as never) : []} />
    </Box>
  );
};

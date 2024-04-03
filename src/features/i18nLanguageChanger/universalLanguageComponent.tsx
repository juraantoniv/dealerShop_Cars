import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

type UniversalLanguageComponentType = {
  str: string;
};

export const UniversalLanguageComponent: React.FC<
  UniversalLanguageComponentType
> = ({ str }) => {
  const { t } = useTranslation();

  return (
    <Typography fontSize={"small"} variant={"subtitle1"}>
      {t(`${str}`)}
    </Typography>
  );
};

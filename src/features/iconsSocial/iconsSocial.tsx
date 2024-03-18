import React from "react";

import IconFacebookCircled from "../../components/svg/facebook";
import IconGithub from "../../components/svg/github";
import IconInstagram from "../../components/svg/instagram.svg";
import IconLinkedinCircled from "../../components/svg/linkedin";
import IconTelegram from "../../components/svg/telegram";
import s from "./iconsSocial.module.css";

export const IconsSocial = () => {
  return (
    <div className={s.icons}>
      <IconInstagram className={s.icon} />

      <IconGithub className={s.icon} />

      <IconLinkedinCircled className={s.icon} />

      <IconFacebookCircled className={s.icon} />

      <IconTelegram className={s.icon} />
    </div>
  );
};

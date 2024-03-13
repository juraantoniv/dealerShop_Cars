import "mdb-react-ui-kit/dist/css/mdb.min.css";

import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";

import { IconsSocial } from "../iconsSocial/iconsSocial";
import s from "./reactFoter.module.css";

export const FooterPage = () => {
  return (
    <MDBFooter className={s.section} color="white" bgColor="dark">
      <MDBContainer className={s.section}>
        <IconsSocial />
        <div className={s.input}>
          <form action="" className={s.input1}>
            <MDBRow className={s.input1}>
              <MDBCol size="auto">
                <p className={s.paragraph}>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md="5" start>
                <MDBInput
                  contrast
                  type="email"
                  label="Email address"
                  className="mb-4"
                />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color="light" type="submit" className="mb-4">
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </div>

        <section className="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            distinctio earum repellat quaerat voluptatibus placeat nam, commodi
            optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          Yura
        </a>
      </div>
    </MDBFooter>
  );
};

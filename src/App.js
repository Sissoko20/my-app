import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Login.css";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

function PhoneSign() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const auth = getAuth(); // Initialisation de l'authentification Firebase

  const sendOtp = async () => {
    try {
      // Initialisation de RecaptchaVerifier avec le 'auth'
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha",
        {
          size: "invisible", // reCAPTCHA invisible
          callback: (response) => {
            // Callback après la validation de reCAPTCHA
            // Vous pouvez lancer l'envoi de l'OTP ici si nécessaire
          },
        },
        auth
      );

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setUser(confirmation);
      console.log("OTP envoyé");
    } catch (e) {
      console.error(e);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="phone-sign">
      <div className="phone-content">
        <PhoneInput
          country={"ml"}
          value={phone}
          onChange={(phone) => setPhone("+" + phone)} // Correction de l'ajout de "+"
        />

        <Button
          onClick={sendOtp}
          style={{ marginTop: "10px", background: "blue", color: "white" }}
        >
          Envoyer OTP
        </Button>
        <div style={{ marginTop: "10px" }} id="recaptcha"></div>

        <br />
        <TextArea
          onChange={(e) => setOtp(e.target.value)}
          style={{ marginTop: "10px", width: "300px" }}
          size="small"
          placeholder="Entrer OTP"
        />
        <br />
        <Button
          onClick={verifyOtp}
          style={{ marginTop: "10px", background: "green" }}
        >
          Vérifier OTP
        </Button>
      </div>
    </div>
  );
}

export default PhoneSign;

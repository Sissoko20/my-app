import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from './firebase'; // Utilisation de l'importation existante

function PhoneSign() {
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    try {
      // Initialisation de RecaptchaVerifier avec 'auth'
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha",
        {
          size: "invisible", // reCAPTCHA invisible
          callback: (response) => {
            // Callback après la validation de reCAPTCHA
          },
        },
        auth
      );

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setUser(confirmation);
      console.log("OTP envoyé");
    } catch (e) {
      console.error(e);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log("OTP vérifié avec succès", data);
    } catch (err) {
      console.error("Erreur lors de la vérification de l'OTP", err);
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
          style={{ marginTop: "10px", background: "green", color: "white" }}
        >
          Vérifier OTP
        </Button>
      </div>
    </div>
  );
}

export default PhoneSign;

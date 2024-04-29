import React from "react";
import "../../styles/components/footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiChevronRight, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsTelephoneForward } from "react-icons/bs";
import { MdPlace } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Footer() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/store/getById");
      setData(res.data.value);
    };
    fetchData();
  }, []);

  return (
    <div className="footer-container">
      <div className="last">
        <span>
          Copyright ©2022 All rights reserved | This template is made with{" "}
          <AiFillHeart /> by 
        </span>
      </div>
    </div>
  );
}

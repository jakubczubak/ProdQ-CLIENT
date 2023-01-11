import React from "react";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./NavSidebar.module.css";

export const NavSidebar = () => {
  return (
    <>
      <div className={styles.navSidebar_container}>
        <h1 className={styles.navSidebar_header}>
          <img src={require("../../assets/sidebar_logo.png")} alt="logo" />{" "}
          INFRABOX
        </h1>
        <ul className={styles.navSidebar_list}>
          <li>
            <AppsOutlinedIcon style={{ color: "white" }} fontSize="medium" />
            <button>Materials</button>
          </li>
          <li>
            <BuildOutlinedIcon style={{ color: "white" }} />
            <button>Tools</button>
          </li>
          <li>
            <CalculateOutlinedIcon style={{ color: "white" }} />
            <button>Calculations</button>
          </li>
          <li>
            <LoopIcon style={{ color: "white" }} />
            <button>Recycling</button>
          </li>
          <li>
            <SettingsOutlinedIcon style={{ color: "white" }} />
            <button>Settings</button>
          </li>
          <li>
            <LogoutIcon style={{ color: "white" }} />
            <button>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

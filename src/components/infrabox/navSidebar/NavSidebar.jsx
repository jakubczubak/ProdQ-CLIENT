import React from "react";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import LoopIcon from "@mui/icons-material/Loop";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./NavSidebar.module.css";
import { Tooltip } from "@mui/material";

export const NavSidebar = () => {
  return (
    <>
      <div className={styles.navSidebar_container}>
      <img src={require("../../../assets/sidebar_logo.png")} alt="logo" />
        <h1 className={styles.navSidebar_header}>
          INFRABOX
        </h1>
        <ul className={styles.navSidebar_list}>
          <Tooltip title="Materials" arrow placement="right">
            <li>
              <AppsOutlinedIcon style={{ color: "white" }} fontSize="medium" />
              <button>Materials</button>
            </li>
          </Tooltip>
          <Tooltip title="Tools" arrow placement="right">
            <li>
              <BuildOutlinedIcon style={{ color: "white" }} />
              <button>Tools</button>
            </li>
          </Tooltip>

          <Tooltip title="Calculations" arrow placement="right">
            <li>
              <CalculateOutlinedIcon style={{ color: "white" }} />
              <button>Calculations</button>
            </li>
          </Tooltip>
          <Tooltip title="Recycling" arrow placement="right">
            <li>
              <LoopIcon style={{ color: "white" }} />
              <button>Recycling</button>
            </li>
          </Tooltip>
          <Tooltip title="Settings" arrow placement="right">
            <li>
              <SettingsOutlinedIcon style={{ color: "white" }} />
              <button>Settings</button>
            </li>
          </Tooltip>
          <Tooltip title="Logout" arrow placement="right">
            <li>
              <LogoutIcon style={{ color: "white" }} />
              <button>Logout</button>
            </li>
          </Tooltip>
        </ul>
      </div>
    </>
  );
};

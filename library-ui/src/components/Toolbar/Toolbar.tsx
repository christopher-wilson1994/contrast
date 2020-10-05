import React from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { BugOutlined, AppstoreOutlined } from "@ant-design/icons";

const Toolbar: React.FC = () => {
  return (
    <React.Fragment>
      {/* <div className="logo"> */}

      {/* </div> */}

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item icon={<AppstoreOutlined />} key="home">
          <NavLink to="/">Libraries</NavLink>
        </Menu.Item>
        <Menu.Item icon={<BugOutlined />} key="analysis">
          <NavLink to="/library/analysis"> Vulnerability Detection</NavLink>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

export default Toolbar;

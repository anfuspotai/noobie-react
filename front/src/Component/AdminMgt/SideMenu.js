import React from "react";
import { Menu } from "antd";
import "antd/dist/antd.css";

import { useHistory} from "react-router-dom";

// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const SideMenu = (props) => {
  const history = useHistory();
  const handleClick = (e) => {
    console.log(e.key);
    history.push(`/${e.key}`)
    
  };
  return (
    <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={[props.activeLink]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        className="h-100"
      >
          <Menu.Item key="dashboard">Dashboard</Menu.Item>

        <Menu.ItemGroup key="g1" title="User Management">
          <Menu.Item key="user-mgt">List User</Menu.Item>
          <Menu.Item key="request-mgt">Pending</Menu.Item>
          <Menu.Item key="incubator-mgt">Incubation</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Settings">
          <Menu.Item key="password">Change Password</Menu.Item>
          {/* <Menu.Item key="5">Option 4</Menu.Item> */}
        </Menu.ItemGroup>
      </Menu>
  )
}

export default SideMenu

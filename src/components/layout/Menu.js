import React, {Component, Fragment} from "react";
import {Icon, Menu} from "antd";
import withRouter from 'umi/withRouter'

class MyMenu extends Component {

  generateMenus = (data,handleSubMenuTitleClick) => {
    return data.map(item => {
      if (item.children) {
        return (
          <Menu.SubMenu
            onTitleClick={handleSubMenuTitleClick}
            key={item.id}
            title={
              <Fragment>
                {item.icon && <Icon type={item.icon}/>}
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </Menu.SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.id} url={item.url} name={item.name}>
            {item.icon && <Icon type={item.icon}/>}
            <span>{item.name}</span>
          </Menu.Item>
        )
      }
    })
  }

  render() {
    const {
      theme,
      menus,
      openKeys,
      selectedKeys,
      handelMenuClick,
      handleSubMenuTitleClick
    } = this.props
    return (
      <Menu theme={theme} mode="inline"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onClick={handelMenuClick}>
        {this.generateMenus(menus,handleSubMenuTitleClick)}
      </Menu>
    );
  }

}

export default withRouter(MyMenu)

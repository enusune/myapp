import React, {Component, Fragment} from "react";
import {Icon, Menu} from "antd";
import withRouter from 'umi/withRouter'

const {SubMenu} = Menu

class MyMenu extends Component {

  constructor() {
    super()
    this.state = {
      defaultSelect: ['1']
    }
  }


  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && <Icon type={item.icon}/>}
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
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
      handelMenuClick
    } = this.props
    return (
      <Menu theme={theme} mode="inline" defaultSelectedKeys={this.state.defaultSelect}
            onClick={handelMenuClick.bind(this)}>
        {this.generateMenus(menus)}
      </Menu>
    );
  }

}

export default withRouter(MyMenu)

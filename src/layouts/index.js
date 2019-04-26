import React from 'react'
import {Layout} from 'antd';
import Header from '../components/layout/Header'
import MyContent from '../components/layout/Content'
import MySider from '../components/layout/Sider'
import MyMenu from '../components/layout/Menu'

import {connect} from 'dva';

class BasicLayout extends React.Component {
  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: {collapsed},
    })
  }

  handelMenuClick(element) {
    //路由到相关页面
    this.props.history.push(element.item.props.url)
  }

  render() {
    const {app, children} = this.props
    const {menus, theme, collapsed} = app
    const {handelMenuClick, onCollapseChange} = this
    const menuProps = {
      theme,
      menus,
      children,
      handelMenuClick,
      onCollapseChange,
    }
    return (
      <Layout>
        <MySider collapsed={collapsed}>
          <MyMenu {...menuProps}/>
        </MySider>
        <Layout>
          <Header collapsed={collapsed} onCollapseChange={onCollapseChange}/>
          <MyContent>
            {this.props.children}
          </MyContent>
        </Layout>
      </Layout>
    );
  }
}

export default connect((({app}) => ({app})))(BasicLayout)

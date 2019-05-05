import React from 'react'
import {Layout} from 'antd';
import Header from '../components/layout/Header'
import MySider from '../components/layout/Sider'
import MyMenu from '../components/layout/Menu'
import MyTab from '../components/layout/Tabs'

import {connect} from 'dva';

class BasicLayout extends React.Component {
  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: {collapsed},
    })
  }

  handelMenuClick = element => {
    let newPane = {title: element.item.props.name, content: '', key: element.key, url: element.item.props.url}
    this.onPaneAdd(newPane)
  }

  onPaneAdd = (newPane) => {
    const {app, dispatch, history,} = this.props
    const {panes,} = app
    let flag = false
    //路由到相关页面
    history.push(newPane.url)
    setTimeout(()=>{
      newPane.content = this.props.children
      let newPanes = panes.map(item => {
        if (newPane.key === item.key) {
          flag = true
          return {...item, ...newPane}
        }
        return item
      })
      dispatch({
        type: 'app/updateState',
        payload: {
          panes: flag ? newPanes : [...newPanes, newPane],
          activeKey: newPane.key,
        },
      })
    },100)
  }

  onPaneChange = targetKey => {
    const {dispatch,} = this.props
    dispatch({
      type: 'app/updateState',
      payload: {
        activeKey: targetKey
      },
    })
  }

  onPaneRemove = targetKey => {
    const {dispatch,} = this.props
    const payload = this._removeTap(targetKey)
    dispatch({
      type: 'app/updateState',
      payload: payload,
    })
  }

  _removeTap = (targetKey) => {
    const {panes, activeKey} = this.props.app
    let newActiveKey = activeKey
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    return {
      panes: newPanes,
      activeKey: newActiveKey
    }
  }

  render() {
    const {app, children} = this.props
    const {menus, theme, collapsed, panes, activeKey,} = app
    const {handelMenuClick, onCollapseChange, onPaneAdd, onPaneChange, onPaneRemove} = this
    const menuProps = {
      theme,
      menus,
      children,
      handelMenuClick,
    }
    const tapProps = {
      panes,
      children,
      activeKey,
      onPaneChange,
      onPaneAdd,
      onPaneRemove,
    }

    return (
      <Layout>
        <MySider collapsed={collapsed}>
          <MyMenu {...menuProps}/>
        </MySider>
        <Layout>
          <Header collapsed={collapsed} onCollapseChange={onCollapseChange}/>
          <MyTab {...tapProps}>
          </MyTab>
        </Layout>
      </Layout>
    );
  }
}

export default connect((({app, loading}) => ({app, loading})))(BasicLayout)

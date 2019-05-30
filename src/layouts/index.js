import React from 'react'
import {Layout, LocaleProvider} from 'antd';
import {MyLayout} from '../components'
import {connect} from 'dva';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn')

const {Header, MySider, MyMenu, MyTab} = MyLayout

class BasicLayout extends React.Component {
    /**
     * 左侧菜单是否收回
     * @param collapsed
     */
    onCollapseChange = collapsed => {
        this.props.dispatch({
            type: 'app/handleCollapseChange',
            payload: {collapsed},
        })
    }

    /**
     * 点击菜单
     * @param element
     */
    handelMenuClick = element => {
        const {dispatch, app} = this.props
        const {selectedKeys} = app
        let newPane = {title: element.item.props.name, content: '', key: element.key, url: element.item.props.url}
        this.onPaneAdd(newPane)
        dispatch({
            type: 'app/updateState',
            payload: {
                selectedKeys: selectedKeys.includes(element.key, 0) ? selectedKeys : [element.key],
            },
        })
    }

    /**
     * 二级菜单点击
     * @param element
     */
    handleSubMenuTitleClick = element => {
        const {dispatch, app} = this.props
        const {openKeys} = app

        dispatch({
            type: 'app/updateState',
            payload: {
                openKeys: openKeys.includes(element.key, 0) ? openKeys.filter(item => item !== element.key) : [...openKeys, element.key],
            },
        })
    }

    /**
     * 打开新的面板
     * @param newPane
     */
    onPaneAdd = (newPane) => {
        const {app, dispatch, history,} = this.props
        const {panes,} = app
        let flag = false
        //路由到相关页面
        history.push(newPane.url)
        setTimeout(() => {
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
        }, 100)
    }

    /**
     * 切换面板
     * @param targetKey
     */
    onPaneChange = targetKey => {
        const {dispatch, app} = this.props
        const {selectedKeys,} = app

        dispatch({
            type: 'app/updateState',
            payload: {
                activeKey: targetKey,
                selectedKeys: selectedKeys.includes(targetKey, 0) ? selectedKeys : [targetKey],
            },
        })
    }

    /**
     * 关闭面板
     * @param targetKey
     */
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
            activeKey: newActiveKey,
            selectedKeys: newActiveKey,
        }
    }


    /**
     * 右键菜单重新加载
     * @param props
     */
    onReloadPane = ({props}) => {
        const {key, panes} = props
        this.onPaneAdd(panes.find(item => item.key === key))
    }

    /**
     * 右键菜单关闭当前
     * @param props
     */
    onCloseThisPane = ({props}) => {
        const {key, panes} = props
        if (panes.find(item => item.key === key).closable === false) {
            return
        }
        this.onPaneRemove(key)
    }

    /**
     * 右键菜单关闭其他
     * @param props
     */
    onCloseOtherPane = ({props}) => {
        const {dispatch} = this.props
        const {key, panes} = props
        dispatch({
            type: 'app/updateState',
            payload: {
                panes: panes.filter(item => item.key === key || item.closable === false),
                activeKey: key,
                selectedKeys: key,
            },
        })
    }

    /**
     * 右键菜单关闭右侧
     * @param props
     */
    onCloseRightPane = ({props}) => {
        const {dispatch} = this.props
        const {key, panes} = props
        let end = panes.findIndex(item => item.key === key) + 1
        dispatch({
            type: 'app/updateState',
            payload: {
                panes: panes.slice(0, end),
                activeKey: key,
                selectedKeys: key,
            },
        })
    }

    render() {
        const {app, children} = this.props
        const {menus, theme, collapsed, panes, activeKey, openKeys, selectedKeys} = app
        const {
            onPaneAdd,
            onPaneChange,
            onPaneRemove,
            onReloadPane,
            handelMenuClick,
            onCloseThisPane,
            onCloseOtherPane,
            onCloseRightPane,
            onCollapseChange,
            handleSubMenuTitleClick
        } = this
        const menuProps = {
            theme,
            menus,
            children,
            openKeys,
            selectedKeys,
            handelMenuClick,
            handleSubMenuTitleClick,
        }
        const tapProps = {
            panes,
            children,
            activeKey,
            onPaneChange,
            onPaneAdd,
            onPaneRemove,
            contextMenuProps: {
                onReloadPane,
                onCloseThisPane,
                onCloseOtherPane,
                onCloseRightPane,
            },
        }

        return (<LocaleProvider locale={zh_CN}>
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
            </LocaleProvider>
        );
    }
}

export default connect((({app, loading}) => ({app, loading})))(BasicLayout)

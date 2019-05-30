import React, {Component} from 'react'
import {Menu, Item, Separator,} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

class TabContextMenu extends Component {

    render() {
        const {
            onReloadPane,
            onCloseThisPane,
            onCloseOtherPane,
            onCloseRightPane,
        } = this.props
        return (
            <Menu id='tabContextMenu'
                  style={{borderRadius: "4px 4px 0 0"}}
            >
                <Item onClick={onReloadPane}>重新加载</Item>
                <Separator/>
                <Item onClick={onCloseThisPane}>关闭当前选项</Item>
                <Item onClick={onCloseOtherPane}>关闭其他选项</Item>
                <Item onClick={onCloseRightPane}>关闭右侧选项</Item>
            </Menu>
        );
    }
}

export default TabContextMenu;

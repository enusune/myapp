import React, {Component} from "react";
import {Layout, Icon} from 'antd';

import styles from "@/layouts/index.css";

const Header = Layout.Header

class MyHeader extends Component {

    render() {
        const {
            collapsed,
            onCollapseChange
        } = this.props
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={onCollapseChange.bind(this, !collapsed)}
                />
            </Header>
        )
    }
}

export default MyHeader

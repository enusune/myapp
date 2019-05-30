import React, {Component} from 'react'
import {Tabs} from 'antd';
import PropTypes from "prop-types";
import withRouter from 'umi/withRouter'
import TabContextMenu from './TabContextMenu';
import TabContextMenuProvider from './TabContextMenuProvider'


const TabPane = Tabs.TabPane;

class MyTab extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        const {panes, onPaneAdd,} = this.props
        if (panes.length === 1) {
            const pane = panes[0]
            onPaneAdd(pane)
        }
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        const {onPaneRemove} = this.props
        onPaneRemove(targetKey)
    }

    onTabClick = () => {

    }

    buildContextMenuData({key, panes}) {
        let data = {key, panes}
        const pane = panes.find(item => item.key === key)
        const index = panes.findIndex(item => item.key === key)
        data.closeOtherDisabled = panes.length === 1;
        data.closeThisDisabled = !!(pane && pane.closable === false);
        data.closeRightDisabled = index === panes.length - 1;
        this.setState(data);
    }

    render() {
        const {
            panes,
            activeKey,
            onPaneChange,
        } = this.props


        return (
            <div>
                <Tabs
                    hideAdd
                    onChange={onPaneChange.bind(this)}
                    activeKey={activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    onTabClick={this.onTabClick}
                >
                    {panes.map(pane =>
                        <TabPane
                            tab={
                                <TabContextMenuProvider onContextMenuShow={this.buildContextMenuData.bind(this)}
                                                        id="tabContextMenu"
                                                        data={{key: pane.key, panes}}>
                                    {pane.title}
                                </TabContextMenuProvider>
                            }
                            key={pane.key}
                            closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    )}
                </Tabs>
                <TabContextMenu {...this.props.contextMenuProps}/>
            </div>
        );
    }
}

MyTab.propTypes = {
    panes: PropTypes.array.isRequired,
    activeKey: PropTypes.string.isRequired,
    onPaneChange: PropTypes.func.isRequired,
}
export default withRouter(MyTab)

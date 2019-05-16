export default {
  namespace: 'app',
  state: {
    collapsed: false,
    activeKey: '1',
    openKeys: ['1'],
    selectedKeys: ['1'],
    panes: [
      {title: `dashboard`, content: '', key: '1', closable: false, url: '/dashboard'},
    ],
    theme: 'dark',
    menus: [{
      id: '1',
      name: 'dashboard',
      icon: 'dashboard',
      url: '/dashboard',
    }, {
      id: '2',
      name: '用户管理',
      icon: 'user',
      url: '1',
      children: [{
        id: '3',
        name: '用户管理',
        icon: 'user',
        url: '/user',
      },]
    }, {
      id: '4',
      name: '用户管理',
      icon: 'user',
      url: '1',
      children: [{
        id: '5',
        name: '用户管理',
        icon: 'user',
        url: '/user',
      },]
    }],
  },
  subscriptions: {},
  effects: {},
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    handleCollapseChange(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export default {
  namespace: 'app',
  state: {
    collapsed: false,
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
      id: '3',
      name: '用户管理',
      icon: 'user',
      url: '1',
      children: [{
        id: '4',
        name: '用户管理',
        icon: 'user',
        url: '/user',
      },]
    }],
  },
  subscriptions: {},
  effects: {},
  reducers: {
    handleCollapseChange(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

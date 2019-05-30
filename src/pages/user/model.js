import request from '../../util/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

export default {
    namespace: 'user',
    state: {
        userDetail:{
            visible: false,
            data: {}
        },
        userList: {
            data: [],
            pagination: {
                pageSize: 10,
                pageSizeOptions: ['10', '20', '30', '40'],
                hideOnSinglePage: true,
                defaultPageSize: 10,
                defaultCurrent: 1,
                showSizeChanger: true
            },
            loading: false,
        },
        userSearchFormParams: {},
    },
    subscriptions: {},
    effects: {
        * queryUserList(_, sagaEffects) {
            const {call, put} = sagaEffects;
            let endPointURI = 'https://randomuser.me/api?';
            if (_.payload.params.method === 'get') {
                for (let index in _.payload.params.data) {
                    endPointURI += `${index}=${_.payload.params.data[index]}&`
                }
            }
            const userList = yield call(request, endPointURI, _.payload.params);
            yield put({type: 'querySuccess', payload: userList});
        }
    },
    reducers: {
        updateState(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        },
        querySuccess(state, {payload}) {
            const pagination = {...state.userList.pagination};
            pagination.total = 100;
            pagination.current = payload.info.page;
            let payload2 = {
                userList: {
                    loading: false,
                    data: payload.results,
                    pagination,
                }
            }

            return {
                ...state,
                ...payload2
            }
        }
    },
}

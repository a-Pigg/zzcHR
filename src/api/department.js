import request from '@/utils/request'

//获取-部门列表
export function getDepartmentAPI() {
    return request({
        url: '/company/department',
        method: 'get'
    })
}
/* Layout */
import Layout from '@/layout'
export default {
    //路由信息
    path:'/department',
    //一级路由
    component: Layout,
    name: 'department',
    children:[{
        path : '',  //二级路由地址为空时，表示 /department 显示一级路由 + 二级路由
        component: ()=>import('@/views/department'),
        name : 'department',
        meta : {
            icon : 'tree',  //图标
            title : '组织'  //标题
        }
    }]
}
import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'
// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'
import AmapView from './components/views/Amap.vue'
import EchartView from './components/views/Echart.vue'
import UploadView from './components/views/Upload.vue'
import MsgLogsView from './components/views/MsgLogs.vue'
import OpLogsView from './components/views/OperationLogs.vue'
import LoginLogsView from './components/views/LoginLogs.vue'
import ViewDeviceView from './components/views/ViewDevice.vue'
import WarningDeviceView from './components/views/WarningDevice.vue'
import EditOrgView from './components/views/EditOrg.vue'
import AddDeviceView from './components/views/WbAddDevice.vue'
import SystemConfigView from './components/views/SystemConfig.vue'
//
import WbMyDeviceList from './components/views/WbMyDeviceList.vue'
import WbDeviceList from './components/views/WbDeviceList.vue'
import WbUserList from './components/views/WbUserList.vue'
import WbAgencyList from './components/views/WbAgencyList.vue'
import WbOperationLogs from './components/views/WbOperationLogs.vue'
import WbMsgLogs from './components/views/WbMsgLogs.vue'
import WbAddAgency from './components/views/WbAddAgency.vue'
import WbEditAgency from './components/views/WbEditAgency.vue'
import WbAddUser from './components/views/WbAddUser.vue'
import WbEditUser from './components/views/WbEditUser.vue'
import WbEditDeviceView from './components/views/WbEditDevice.vue'
import WbEditConfig from './components/views/WbEditConfig.vue'
import WbRealtimeCurve from './components/views/WbRealtimeCurve.vue'
import CurveView from './components/views/WbCurve.vue'
import WbMsgDetail from './components/views/WbMsgDetail.vue'
import WbMyDeviceTestList from './components/views/WbMyDeviceListTest.vue'
import WbSendRequest from './components/views/WbSendRequest.vue'
// Routes
const routes = [
  {
    path: '/backend',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'request/send',
        alias: 'WbSendRequest',
        component: WbSendRequest,
        name: '发送request给设备',
        meta: {description: 'WbSendRequest'}
      },
      {
        path: 'device/list/test',
        alias: 'WbMyDeviceTestList',
        component: WbMyDeviceTestList,
        name: '我的设备测试',
        meta: {description: 'WbMyDeviceTestList'}
      },
      {
        path: '/msg/detail',
        alias: 'WbMsgDetail',
        component: WbMsgDetail,
        name: 'WbMsgDetail',
        meta: {description: 'WbMsgDetail'}
      },
      {
        path: '/curve/realtime',
        alias: 'WbRealtimeCurve',
        component: WbRealtimeCurve,
        name: '编辑realtimeview',
        meta: {description: 'WbRealtimeCurve'}
      },
      {
        path: 'config/edit',
        alias: 'WbEditConfig',
        component: WbEditConfig,
        name: '编辑config',
        meta: {description: 'WbEditConfig'}
      },
      {
        path: 'user/add',
        alias: 'WbAddUser',
        component: WbAddUser,
        name: '添加用户',
        meta: {description: 'WbAddUser'}
      },
      {
        path: 'user/list',
        alias: 'WbUserList',
        component: WbUserList,
        name: '用户列表',
        meta: {description: 'WbUserList'}
      },
      {
        path: 'agency/edit',
        alias: 'WbEditAgency',
        component: WbEditAgency,
        name: '编辑组织机构',
        meta: {description: 'WbEditAgency'}
      },
      {
        path: 'agency/list',
        alias: 'WbAgencyList',
        component: WbAgencyList,
        name: '组织机构',
        meta: {description: 'WbAgencyList'}
      },
      {
        path: 'agency/add',
        alias: 'WbAddAgency',
        component: WbAddAgency,
        name: ' 添加组织',
        meta: {description: 'WbAddAgency'}
      },
      {
        path: 'log/list/op',
        alias: 'WbOperationLogs',
        component: WbOperationLogs,
        name: '操作日志',
        meta: {description: 'WbOperationLogs'}
      },
      {
        path: 'log/list/msg',
        alias: 'WbMsgLogs',
        component: WbMsgLogs,
        name: '消息日志',
        meta: {description: 'WbMsgLogs'}
      },
      {
        path: 'device/list',
        alias: 'WbDeviceList',
        component: WbDeviceList,
        name: '设备',
        meta: {description: 'WbDeviceList'}
      },
      {
        path: 'device/list/my',
        alias: 'WbMyDeviceList',
        component: WbMyDeviceList,
        name: '我的设备',
        meta: {description: 'WbMyDeviceList'}
      },
      {
        path: 'sysConfig',
        alias: 'sysconfig_alias',
        component: SystemConfigView,
        name: '系统设置',
        meta: {description: 'SystemConfigView'}
      },
      {
        path: 'device/add',
        alias: 'editorg',
        component: AddDeviceView,
        name: '添加设备',
        meta: {description: 'editorg'}
      },
      {
        path: 'org/edit',
        alias: 'editorg',
        component: EditOrgView,
        name: 'editorg',
        meta: {description: 'editorg'}
      },
      {
        path: 'device/warning',
        alias: 'WarningDeviceView',
        component: WarningDeviceView,
        name: 'WarningDeviceView',
        meta: {description: 'WarningDeviceView'}
      },
      {
        path: 'device/view',
        alias: 'ViewDeviceView',
        component: ViewDeviceView,
        name: 'ViewDeviceView',
        meta: {description: 'ViewDeviceView'}
      },
      {
        path: 'device/edit',
        alias: 'WbEditDeviceView',
        component: WbEditDeviceView,
        name: 'WbEditDeviceView',
        meta: {description: 'WbEditDeviceView'}
      },
      {
        path: 'messageLog',
        alias: 'LogsView',
        component: MsgLogsView,
        name: '消息日志',
        meta: {description: 'LogsView'}
      },
      {
        path: 'operateLog',
        alias: 'OpLogsView',
        component: OpLogsView,
        name: '操作日志',
        meta: {description: 'OpLogsView'}
      },
      {
        path: 'loginLog',
        alias: 'LoginLogsView',
        component: LoginLogsView,
        name: '登录日志',
        meta: {description: 'LoginLogsView'}
      },
      {
        path: 'user/edit',
        alias: 'edituser',
        component: WbEditUser,
        name: 'WbEditUser',
        meta: {description: 'WbEditUser'}
      },
      {
        path: 'upload',
        alias: 'upload_alias',
        component: UploadView,
        name: 'UploadView',
        meta: {description: 'UploadView'}
      },
      {
        path: 'echart',
        alias: 'echart_alias',
        component: EchartView,
        name: 'echartView',
        meta: {description: 'echart'}
      },
      {
        path: 'amap',
        alias: 'amap_alias',
        component: AmapView,
        name: 'amapView',
        meta: {description: '曲线图'}
      },
      {
        path: 'curve',
        alias: 'curve_alias',
        component: CurveView,
        name: 'CurveView',
        meta: {description: '曲线图'}
      },
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      },
      {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes

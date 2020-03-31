import mock from "./mock";//前端开发
import develop from "./develop";//对接api
import test from "./test";//测试配置
import production from "./production";//生产配置

// const env = "mock";
// const env = "develop";
// const env = "test";
const env = "production";
const envConfigs = {mock,develop,test,production};

export const API_URL= envConfigs[env].API_URL;
export const LOGIN_URL=envConfigs[env].LOGIN_URL;
export const APP_URL=envConfigs[env].APP_URL;
export const PIC_URL = envConfigs[env].PIC_URL;//图片路径修复
export const SUB_FIX = envConfigs[env].SUB_FIX;//图片后缀
export const YK_URL = "https://www.991kang.com";//医康基础链接
export const CW_ACT = YK_URL + "/commonwealActivity/detail/"; //公益活动基础链接
export const OUTER_LINKS = {
  subscribeIndex: YK_URL + "/index",
  recommenrIndex: YK_URL + "/index?card=1",
  dairyIndex: YK_URL + "/index?card=2",
  scienceIndex: YK_URL + "/index?card=3",
  patientIndex: YK_URL + "/index?card=4",
  caseIndex: YK_URL + "/index?card=5",
  subjectIndex: YK_URL + "/index?card=6&swiper_num=7",
  courseIndex: YK_URL + "/index?card=7",
  videoIndex: YK_URL + "/index?card=8",
  courseDetails: YK_URL + "/lesson/intro/",
  activityIndex: YK_URL + "/commonwealIndex/index",
  weiTalkIndex: YK_URL + "/weiTalkIndex/index",
  weiTalkDetail: YK_URL + "/weiTalkDetail/detail/",
  consultDetail: YK_URL + "/article/conAnalysis/",
  subjectDetail: YK_URL + "/popSubject/detail/", //专题详情

  serviceList: YK_URL + "/personal/service",
  //医生部分
  docConsult: YK_URL + "/consult/index?drId=",
  docOrder: YK_URL + "/outpatient/doctorOutpatientList/",
  docAchievement: YK_URL + "/doctor/achievement/",
};

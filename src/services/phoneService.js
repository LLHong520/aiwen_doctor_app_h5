import request from "@/request";
let interfaces=[
  {
    desc: "医生获取指定用户的电话咨询聊天记录",
    method: "postForm",
    name: "getDialougeList",
    url: "/telephone/consultation/dialogue/doctorPatientDialoguePage",
  },
  {
    desc: "电话咨询医生回答消息",
    method: "postForm",
    name: "answer",
    url: "/telephone/consultation/dialogue/saveAnswer",
  },
  {
    desc: "医生电话咨询数据统计",
    method: "post",
    name: "consultStatistics",
    url: "/telephone/consultation/dialogue/data",
  },
  {
    desc: "医生电话咨询记录",
    method: "postForm",
    name: "consultList",
    url: "/telephone/consultation/dialogue/patientDialoguePage",
  },
  {
    desc: "医生电话咨询-当前最新订单",
    method: "postForm",
    name: "orderCurrent",
    url: "/telephone/consultation/order/findOrder",
  },
  {
    desc: "删除医生电话咨询记录",
    method: "postForm",
    name: "deleteConsultList",
    url: "/telephone/consultation/dialogue/deleteDialoguePage",
  },
  {
    desc: "医生电话咨询历史订单",
    method: "postForm",
    name: "historyOrderList",
    url: "/telephone/consultation/order/doctorOrderPage",
  },
  {
    desc: "获取医生的电话咨询设置",
    method: "postForm",
    name: "settingsGet",
    url: "/telephone/consultation/setting/getDoctorSetting",
  },
  {
    desc: "设置医生的电话咨询信息",
    method: "postForm",
    name: "settingsEdit",
    url: "/telephone/consultation/setting/saveDoctorSetting",
  },
  {
    desc: "医生关闭自己的电话咨询服务",
    method: "postForm",
    name: "settingsClose",
    url: "/telephone/consultation/setting/closeDoctorSetting",
  },
  {
    desc: "医生将指定用户的聊天记录设置为已读",
    method:"postForm",
    name:"read",
    url: "/telephone/consultation/dialogue/doctorIsRead",
  },
  {
    desc: "医生主动发起电话呼叫",
    method:"postForm",
    name: "reCallPatinet",
    url: "/telephone/consultation/order/doctorCall",
  },
  {
    desc: "医生确认订单",
    method:"postForm",
    name: "doctorConfirmOrder",
    url: "/telephone/consultation/order/doctorConfirm",
  },
  {
    desc: "根据用户订单取消订单",
    method:"postForm",
    name: "cancelOrder",
    url: "/telephone/consultation/order/cancelOrderByPayId",
  },
  {
    desc: "获取医生信息信息",
    method:"post",
    name: "getInformation",
    url: "/telephone/consultation/information/getInformation",
  },
];

// const preFix = "/saas/proxy/inquiry/api";
const preFix = "/api/doctor/application/h5";

function exportsRender(interfaces) {
  let resultExports = {};
  interfaces.map((item)=>{
    resultExports[item.name] = (data)=>{
      return request[item.method](preFix + item.url, data);
    };
  });
  return resultExports;
}

export default exportsRender(interfaces);

import request from "@/request";
let interfaces=[
  {
    desc: "医生注册-手机校验是否被使用",
    method: "get",
    name: "phoneverify",
    url: "/api/doctor/application/h5/registered/phoneVerify",
  },
  {
    desc: "医生注册-获取注册验证码",
    method: "get",
    name: "registercode",
    url: "/api/doctor/application/h5/code/registeredCode",
  },
  {
    desc: "医生注册",
    method: "postForm",
    name: "register",
    url: "/api/doctor/application/h5/phone/register",
  },
  {
    desc: "医生基本信息完善",
    method: "postForm",
    name: "doctorinfor",
    url: "/api/doctor/application/h5/phone/doctorInformation",
  },
  {
    desc: "获取科室列表",
    method: "postForm",
    name: "department",
    url: "/api/doctor/application/h5/depart/departTree",
  },
  {
    desc: "获取城市下拉列表",
    method: "postJson",
    name: "getCitys",
    url: "/h5/doctor/information/api/district/citys",
  },
  {
    desc: "获取省份",
    method: "postJson",
    name: "getProvinces",
    url: "/h5/doctor/information/api/h/c/provinces",
  },
  {
    desc: "获取城市",
    method: "postJson",
    name: "getDistrict",
    url: "/h5/doctor/information/api/h/c/district",
  },
  {
    desc: "获取区/县合集",
    method: "postJson",
    name: "getAreas",
    url: "/h5/doctor/information/api/h/c/areas",
  },
  {
    desc: "根据城市、区/县查询医院",
    method: "postJson",
    name: "getHospital",
    url: "/h5/doctor/information/api/h/c/list",
  },
  {
    desc: "图片上传",
    method: "postFile",
    name: "uploadImg",
    url: "/api/doctor/application/h5/file/uploadImg",
  },
];

const preFix = "";
// const preFix = "/h5/doctor/information/api";
// const preFix = "/saas/proxy/tool/api";

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

import request from "@/request";
let interfaces = [
  {
    desc: "获取所有省市区",
    method: "postForm",
    name: "getAllArea",
    url: "/api/doctor/application/h5/area/getAllArea",
  },
  {
    desc: "根据省和城市或者区/县/名称查询医院",
    method: "postForm",
    name: "getAreaHospitalList",
    url: "/api/doctor/application/h5/hospital/city/list",
  },
];
const preFix = "";

function exportsRender(interfaces) {
  let resultExports = {};
  interfaces.map((item) => {
    resultExports[item.name] = (data) => {
      return request[item.method](preFix + item.url, data);
    };
  });
  return resultExports;
}

export default exportsRender(interfaces);

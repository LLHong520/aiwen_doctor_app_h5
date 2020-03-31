import request from "@/request";
let interfaces=[
  {
    desc: "删除常用语",
    method: "postForm",
    name: "deleteUsefulExpressions",
    url: "/doctor/application/h5/telephone/useful/expressions/deleteUsefulExpressions",
  },
  {
    desc: "查询常用语列表",
    method: "postForm",
    name: "findAllUseful",
    url: "/doctor/application/h5/telephone/useful/expressions/findAllUseful",
  },
  {
    desc: "添加常用语",
    method: "postForm",
    name: "saveUsefulExpressions",
    url: "/doctor/application/h5/telephone/useful/expressions/saveUsefulExpressions",
  },
  {
    desc: "编辑常用语",
    method: "postForm",
    name: "updateUsefulExpressions",
    url: "/doctor/application/h5/telephone/useful/expressions/updateUsefulExpressions",
  },
  {
    desc: "查询常用语详情",
    method: "postForm",
    name: "UsefulExpressionsDetails",
    url: "/doctor/application/h5/telephone/useful/expressions/UsefulExpressionsDetails",
  },
];

const preFix = "/api";

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

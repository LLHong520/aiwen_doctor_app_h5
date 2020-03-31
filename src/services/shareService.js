import request from "@/request";
let interfaces=[
  {
    desc: "获取分享推广卡片信息列表复制文",
    method: "post",
    name: "sharing",
    url: "/sharing/modules/list",
  }
];

const preFix = "/saas/proxy/tool/api";

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

import request from "@/request";
let interfaces=[
  {
    desc: "保存或更新商业报价信息",
    method: "post",
    name: "priceUpdate",
    url: "/commercial/price/saveorupdate",
  },
  {
    desc: "根据用户id获取最新商业报价信息",
    method: "post",
    name: "getUserPrice",
    url: "/commercial/price/userId",
  }
];

const preFix = "/saas/proxy/tool/api";

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

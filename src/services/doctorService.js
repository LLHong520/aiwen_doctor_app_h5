import request from "@/request";
let interfaces=[
  {
    desc: "医生专栏列表",
    method: "post",
    name: "getAllTopic",
    url: "/sinaHealth/getAllTopic",
  },
  {
    desc: "医生专栏基本信息",
    method:"post",
    name: "getTopicInfo",
    url: "/sinaHealth/getTopicInfo",
  },
  {
    desc: "根据域名后缀查询医生专栏模块概览列表",
    method: "post",
    name: "getDoctorTopicList",
    url: "/sinaHealth/getDoctorTopicList",
  },
  {
    desc: "专栏模块内容分页",
    method: "post",
    name: "getSinaHealthPage",
    url: "/sinaHealth/getSinaHealthPage",
  },
  {
    desc: "专栏模块内容详情",
    method: "post",
    name: "getSinaHealthDetail",
    url: "/api/sinaHealth/getSinaHealthDetail",
  },
  {
    desc: "报表数据概览",
    method: "get",
    name: "summary",
    url: "/app/chart/summary",
  },
  {
    desc: "你的付出",
    method: "get",
    name: "pain",
    url: "/app/chart/pain",
  },
  {
    desc: "你的回报",
    method: "get",
    name: "gain",
    url: "/app/chart/gain",
  },
  {
    desc: "你的推广建议回报",
    method: "get",
    name: "suggestion",
    url: "/app/chart/suggestion",
  }
];

function exportsRender(interfaces) {
  let resultExports = {};
  interfaces.map((item)=>{
    resultExports[item.name] = (data)=>{
      return request[item.method](item.url, data);
    };
  });
  return resultExports;
}

export default exportsRender(interfaces);

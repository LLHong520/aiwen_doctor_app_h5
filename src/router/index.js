import Vue from "vue";
import Router from "vue-router";
import Page404 from "@/pages/404";
import Report from "@/pages/report";
import Share from "@/pages/share";
import quotedPrice from "@/pages/quotedPrice";

//电话咨询
import dialougeList from "@/pages/phoneConsult/dialougeList";
import ConsultRecord from "@/pages/phoneConsult/consult_record";
import ConsultHelp from "@/pages/phoneConsult/consult_help";
import ConsultAgreement from "@/pages/phoneConsult/consult_agreement";
import ConsultSettings from "@/pages/phoneConsult/consult_settings";
import phoneUseGuaid from "@/pages/phoneConsult/use_guaid";
import courseList from "@/pages/videoCourse/course_list";
import courseDetail from "@/pages/videoCourse/course_detail";

//医生注册
import doctorJoin from "@/pages/doctorRegister/regitster/join";
import doctorRegister from "@/pages/doctorRegister/regitster/submit";
import doctorTips from "@/pages/doctorRegister/regitster/tips";
import doctorInfoEdit from "@/pages/doctorRegister/doctorInfoEdit/baseinfo";
import agreement from "@/pages/doctorRegister/agreement";
import agreementPrivacy from "@/pages/doctorRegister/agreement_privacy";

//常用语管理
import phrase from "@/pages/phrase/list";
import phraseAdd from "@/pages/phrase/add";

import setTitle from "@/common/setTitle";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/h5/app/chart/",
  fallback: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      redirect: "/404"
    },
    {
      path: "/report",
      name: "Report",
      component: Report,
      meta: {
        title: "报表"
      }
    },
    {
      path: "/404",
      name: "Page404",
      component: Page404,
      meta: {
        title: "404"
      }
    },
    {
      path: "/share",
      name: "Share",
      component: Share,
      meta: {
        title: "分享"
      }
    },
    {
      path: "/dialougeList/:id",
      name: "dialougeList",
      component: dialougeList,
      meta: {
        title: "聊天记录"
      }
    },
    {
      path: "/consultRecord",
      name: "consultRecord",
      component: ConsultRecord,
      meta: {
        title: "咨询记录"
      }
    },
    {
      path: "/consultHelp",
      name: "consultHelp",
      component: ConsultHelp,
      meta: {
        title: "电话咨询帮助"
      }
    },
    {
      path: "/consultAgreement",
      name: "consultAgreement",
      component: ConsultAgreement,
      meta: {
        title: "电话咨询协议"
      }
    },
    {
      path: "/consultSettings",
      name: "consultSettings",
      component: ConsultSettings,
      meta: {
        title: "咨询设置"
      }
    },
    {
      path: "/phone/useGuaid",
      name: "phone.useGuaid",
      component: phoneUseGuaid,
      meta: {
        title: "电话咨询操作流程"
      }
    },
    {
      path: "/quotedPrice/:userId",
      name: "quotedPrice",
      component: quotedPrice,
      meta: {
        title: "商业报价"
      }
    },
    {
      path: "/courseList",
      name: "courseList",
      component: courseList,
      meta: {
        title: "课程列表"
      }
    },
    {
      path: "/courseDetail/:id",
      name: "courseDetail",
      component: courseDetail,
      meta: {
        title: "课程详情"
      }
    },
    {
      path: "/doctor/join",
      name: "doctor.Join",
      component: doctorJoin,
      meta: {
        title: "加入爱问医生"
      }
    },
    {
      path: "/doctor/register",
      name: "doctor.register",
      component: doctorRegister,
      meta: {
        title: "注册账号"
      }
    },
    {
      path: "/doctor/tips",
      name: "doctor.tips",
      component: doctorTips,
      meta: {
        title: "温馨提示"
      }
    },
    {
      path: "/doctor/infoEdit/:id",
      name: "doctor.infoEdit",
      component: doctorInfoEdit,
      meta: {
        title: "信息完善"
      }
    },
    {
      path: "/doctor/agreement",
      name: "doctor.agreement",
      component: agreement,
      meta: {
        title: "爱问医生注册协议"
      }
    },
    {
      path: "/doctor/agreement/privacy",
      name: "doctor.agreementprivacy",
      component: agreementPrivacy,
      meta: {
        title: "隐私政策"
      }
    },
    //医生注册新浪入口
    {
      path: "/sina/doctor/join",
      name: "sinaDoctor.Join",
      component: doctorJoin,
      meta: {
        title: "加入爱问医生"
      }
    },
    //常用语
    {
      path: "/phrase",
      name: "phrase.list",
      component: phrase,
      meta: {
        title: "常用语"
      }
    },
    {
      path: "/phrase/add",
      name: "phrase.add",
      component: phraseAdd,
      meta: {
        title: "新增常用语"
      }
    },
  ]
});
router.beforeEach((to, from, next) => {
  let title = to.meta.title;
  setTitle(title);
  console.log(to.matched);
  next(); //如果匹配到正确跳转
  // if (to.matched.length === 0) {
  //   from.name ? next({
  //     name: from.name
  //   }): next();
  // } else {
  //   next(); //如果匹配到正确跳转
  // }
});
export default router;

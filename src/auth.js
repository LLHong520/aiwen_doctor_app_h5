import storage from "good-storage";
const storage_pre_fix ="aiwen_user_";
export default {
  userinfo(){
    let userinfo = storage.session.get(storage_pre_fix + "userinfo");
    if (userinfo==undefined){
      userinfo=null;
    }
    return userinfo;
  },
  is_login(){
    var isLogin = false;
    if (storage.session.get(storage_pre_fix +"userinfo") != undefined) {
      isLogin = true;
    }
    isLogin = true;
    return isLogin;
  },
  token(){
    return storage.session.get(storage_pre_fix + "token") || "wenwo-cloud-doctor-token";
    // return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUwMjAyODMwODcsInBheWxvYWQiOiJcIjEzNjkxOTkwMTEyXCIifQ.6pYjRZINpXTZzVfz288ZFPhauzG7VSGDRXMfYzTZW5U"; 
  },
  save_userinfo(val){
    storage.session.set(storage_pre_fix +"userinfo",val);
  },
  save_token(val){
    storage.session.set(storage_pre_fix +"token", val);
  }
};

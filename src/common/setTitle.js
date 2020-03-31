module.exports = function (newTitle) {
  if(newTitle==undefined){
    newTitle="载入中...";
  }
  // var $body = $('body');
  document.title =newTitle;
  // hack在微信等webview中无法修改document.title的情况
  // var $iframe = $('<iframe src="/favicon.ico"></iframe>');
  // $iframe.css("display","none");
  // $iframe.on('load',function() {
  //   setTimeout(function() {
  //     $iframe.off('load').remove();
  //   }, 0);
  // }).appendTo($body);
};

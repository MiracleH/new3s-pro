// 后台api 请求地址
export const requesturl: string = "/main";
// 系统名称
export const projectName: string = "";
//公司logo
export const logo: string = "";
//请求超时时间
export const timeout: number = 10000;
//请求错误状态
export enum errorCode {
  "服务器请求失败" = 500,
  "参数校验失败" = 400,
  "请求地址有误" = 404,
  "服务器访问量过大，请稍后重试" = 502,
  "登陆状态失效，请重新登录" = 401,
}
//用户提示语
export enum messageall {
  "操作成功" = 1,
}

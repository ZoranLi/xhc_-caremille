/**
 * member_role:
 *  MEMBER
 *  会员：MEMBER
 *  院长：DEAN
 *  导师：MENTOR
 *
 *  WB_MEMBER
 *  微商会员：WB_MEMBER
 *  总监：DIRECTOR
 *  合伙人：PARTNER
 *  首席市场官：CHAIRMAN
 */
export default async function ({isServer, store, req, query, $axios, redirect}) {
  if (isServer && !req) return
  if (!store.getters.login) redirect('/login') //没登录 去登录
  
  // let resp = await $axios.$get('/v1/agent/distribution/check'); //
  // resp = resp.data
  // switch (resp.status) {
  //   case 0://去注册 完善信息
  //   case 3://审核失败
  //     redirect('/register');
  //     break;
  //   case 1://审核中
  //     redirect('/register');
  //     break;
  //   case 2://审核通过
  //     redirect('/');
  //     break;
  // }
  
  
}

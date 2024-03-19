import { request } from "@/api/service"
import { LoginBean } from '@/bean/login-bean'
import { ResponseBean } from "@/bean/response-bean";


export async function testAPI() {
    return await request({
        url: "/todos",
        method: "get",
    })
}


export async function loginAPI(name: string, pwd: string) {
    return await request({
        url: "/admin/login",
        method: "post",
        data: {
            username: name,
            password: pwd,
        }
    }) as LoginBean;
}


export async function addPattern(data: any) {
    const rep = await request({
        url: "/admin/pattern/add",
        method: "post",
        data: data
    }) as ResponseBean;
    return rep.code == 200;
}

export async function delPattern(id: number) {
    const rep = await request({
        url: "/admin/pattern/del",
        method: "post",
        data: {
            id: id,
        }
    }) as ResponseBean;
    return rep.code == 200;
}

export async function editPattern(data: any) {
    console.log(data)
    const rep = await request({
        url: "/admin/pattern/edit",
        method: "post",
        data: data
    }) as ResponseBean;
    return rep.code == 200;
}

export async function listPattern(page: number, pageSize: number) {
    return await request({
        url: "/admin/pattern/list",
        method: "post",
        data: {
            page: page,
            pageSize: pageSize
        }
    });
}

export function bizSuccess(data:any) {
    return data.code == 200
}





// /** 获取登录验证码 */
// export function getLoginCodeApi() {
//   return request<Login.LoginCodeResponseData>({
//     url: "login/code",
//     method: "get"
//   })
// }

// /** 登录并返回 Token */
// export function loginApi(data: Login.LoginRequestData) {
//   return request<Login.LoginResponseData>({
//     url: "users/login",
//     method: "post",
//     data
//   })
// }

// /** 获取用户详情 */
// export function getUserInfoApi() {
//   return request<Login.UserInfoResponseData>({
//     url: "users/info",
//     method: "get"
//   })
// }
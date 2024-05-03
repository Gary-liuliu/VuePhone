//导入请求工具request.js
import request from "../utils/request.js";

export const getPhone = (id) => {
  return request.get(`/phone/get?phoneNumber=` + id);
};

export const getPhoneList = () => {
  return request.get(`/phone`);
};

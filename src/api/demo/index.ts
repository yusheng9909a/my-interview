import request from "../base";

export const getDemoData = (id:any) => {
  return request.post(`/api/demo`,{id});
};



import { CODE_SUCCESS, STATUS_TIME_OUT, CODE_TIME_OUT, RESULT_CODE_PUSH_OUT, ERROR_NETWORK_CODE } from "@config/api";
import { translate } from "@utils";
import { AxiosResponse, AxiosError } from "axios";
import { ResponseBase, HandleErrorApi } from "src/app/common/handle-error";



const responseDefault: ResponseBase<any> = {
    code: -500,
    status: false,
    msg: translate('error:errorData'),
    data: {},
  };
  
export const handleResponseAxios = <T>(
    res: AxiosResponse<T>,
  ): ResponseBase<T> => {
    if (res.data) {
      return {code: CODE_SUCCESS, status: true, data: res.data, msg: null};
    }
    return responseDefault;
  };
  
  export const handleErrorAxios = (error: AxiosError): ResponseBase<any> => {
    if (error.code === STATUS_TIME_OUT) {
      // timeout
      return HandleErrorApi(CODE_TIME_OUT);
    }
    if (error.response) {
      if (error.response.status === RESULT_CODE_PUSH_OUT) {
        return HandleErrorApi(RESULT_CODE_PUSH_OUT);
      } else {
        return HandleErrorApi(error.response.status);
      }
    }
    return HandleErrorApi(ERROR_NETWORK_CODE);
  };
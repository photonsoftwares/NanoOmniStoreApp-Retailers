import { showMessage } from "react-native-flash-message";
import { ApiRequest } from "./apiRequests";
import { BASE_URL } from "./Base_Url";
import { loginSuccess } from "../ReduxToolkit/features/authSlice";
import axios from 'axios';






export const SignUpMethod = data => async (dispatch) => {
  // console.log("SignUpAction_props", data)

  try {
    const endUrl = `${BASE_URL}user-master/customer-sign-up`;
    const headers = {};
    const body = data;
    const method = 'POST';
    // let response = await ApiRequest(endUrl, method, headers, body);
    const response = await ApiRequest(endUrl, method, headers, body);

    console.log("SignUpAction response", response);

    if (response?.status) {
      showMessage({
        message: "Registration successfully done",
        type: 'success'
      })
    }
    else {
      showMessage({
        // message: "User already register!",
        message: `${response.message}`,
        type: "danger",
      })
    }
    return response;
  } catch (error) {
    showToast(error)
  }

}


// export const LogInMethod = data => async dispatch => {
//   // console.log("LoginAction_props", data)


//   try {
//     const endUrl = ${BASE_URL}auth/user-login;
//     const headers = {};
//     const body = data;
//     const method = 'POST';
//     const response = await ApiRequest(endUrl, method, headers, body);


//     console.log('LoginAction response', response?.data);
//     if (response.status !== true) {
//       showMessage({
//         message: "Please Check Number and Password",
//         type: "danger",
//       })

//     } else if (response.status) {
//       // await dispatch({
//       //   type: ActionTypes.LOGIN,
//       //   payload: response?.data,
//       // });
//       // showToast('Welcome Again')
//       await dispatch(loginSuccess(response.data))
//       showMessage({
//         message: "Welcome",
//         type: "success",
//       })

//     }
//     return response;
//   } catch (error) {
//     // console.log('Network Error Login', error);
//     // showToast(error)
//     showMessage({
//       message: { error },
//       type: "danger",
//     })

//   }


// };





export const LogInMethod = data => async dispatch => {
  // console.log("LogInMethod", data)



  try {
    const endUrl = `${BASE_URL}auth/user-login`;
    const headers = {};
    const method = 'POST';

    const response = await axios({
      method: 'POST',
      url: endUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })

    console.log('LoginAction response', response?.data?.data);
    // console.log('LoginAction response', response?.data?.data?.user_data?.userType);
    if (response?.data?.status === true) {
      if (response?.data?.data?.user_data?.userType === 'RETAILER') {
        dispatch(loginSuccess(response?.data?.data));
        showMessage({
          message: "Welcome",
          type: "success",
        });
      } else {
        showMessage({
          message: "This App For Retailer",
          type: "danger",
        })
      }



    } else {
      showMessage({
        message: "Please Check Number and Password",
        type: "danger",
      })

    }

    return response;
  } catch (error) {
    // console.error('Network Error Login', error);
    // Extract the error message from the error object
    const errorMessage = error.response?.data?.message || 'An error occurred';

    showMessage({
      message: errorMessage,
      type: "danger",
    });


  }
};
// getCommonHeaders = () => {
//     let commonHeaders = {
//         // Accept: 'application/json',
//         'Content-Type': 'application/json',
//         // 'Cache-Control': 'no-cache',
//     };

//     return commonHeaders;
// };

// export async function ApiRequest(endUrl, method, headers, body) {
//     // console.log("endUrl, method, headers, body", endUrl, method, headers, body)


//     try {
//         var myHeaders = new Headers();
//         myHeaders.append('Content-Type', 'application/json');

//         var requestOptions =
//             method == 'GET'
//                 ? {
//                     method: method,
//                     // headers: myHeaders,
//                 }
//                 : {
//                     method: method,
//                     headers: headers ? headers : myHeaders,
//                     body: body,
//                 };

//         // console.log('requestOptions', endUrl, requestOptions)

//         return fetch(endUrl, requestOptions)
//             .then(response => response.json())
//             .then(result => {
//                 console.log('result', result);
//                 return result;
//             })

//             .catch(error => console.log('error', error));
//     } catch (e) {
//         console.log(e);
//     }
// }


import { showMessage } from 'react-native-flash-message';

getCommonHeaders = () => {
  let commonHeaders = {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
  };

  return commonHeaders;
};

export async function ApiRequest(endUrl, method, headers, body) {
  // console.log("endUrl, method, headers, body", endUrl, method, headers, body)


  try {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions =
      method == 'GET'
        ? {
          method: method,
          // headers: myHeaders,
        }
        : {
          method: method,
          headers: myHeaders,
          body: body,
        };
    // console.log('endUrl', endUrl);
    // console.log('requestOptions', requestOptions);
    return fetch(endUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('result', result);
        return result;
      })
      .catch(error => console.log('error', error));
  } catch (e) {
    // console.log(e);
    showMessage({
      message: e,
      type: "danger",
    })
  }
}

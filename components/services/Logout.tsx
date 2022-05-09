// import useAuth from "./Login";
// import create from 'zustand';
// const URI = 'http://10.31.37.146:8081';


// const { loginResponse } = useAuth();




// export const logoutFunction = async () => {
//     const url = URI + '/api/auth/logout';
//     console.log(url);
//     try {
//         let response = await fetch(url, { method: "POST" });

//         headers: new Headers({
//             'Authorization': 'Bearer ' + loginResponse.access_token,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         });

//         let logoutResponseJsonData = await response.json();
//         console.log(logoutResponseJsonData);
//     }
//     catch (e) {
//         console.error(e)
//     }
// }







// // interface LogoutState {
// //     logoutResponse: any;
// //     logout: () => Promise<void>;
// //   }
// //   const useLogout = create<LogoutState>((set) => ({
// //     logoutResponse: null,
// //     logout: async () => {
// //       const url = URI + '/api/auth/logout';
// //           console.log(url);
// //           try {
// //             var response = await fetch(url, { method: "POST" });
// //             headers: new Headers({
// //                 'Authorization': 'Bearer '+ loginResponse.access_token, 
// //                 'Content-Type': 'application/x-www-form-urlencoded'
// //             });
// //             var responseJsonData = await response.json();
// //             set({ logoutResponse: responseJsonData });
// //               console.log(responseJsonData);
// //           }
// //           catch (e) {
// //               console.error(e)
// //           }
// //     },
// //   }));

// //   export default useLogout;
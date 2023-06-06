// import { IService } from "../component/AddServices";
import {getToken, verifyToken} from "./auth";


const serverUrl = 'http://localhost:3000/';

// export const handleRequest =
// function (endPoint: string, data: object) : Promise<Response>{

//     return fetch(`${serverUrl}${endPoint}`, {

//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {'Content-Type': 'application/json'},
               
//     });

// }

// export const patchRequest =
//     function (endPoint: string, data: object): Promise<Response> {

//         return fetch(`${serverUrl}${endPoint}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-auth-token': getToken(),
//             },
//             body: JSON.stringify(data)
//         });
//     }

export const getRequest =
    function (endPoint: string): Promise<Response> | null {
        if (!verifyToken()) {
    
            return null;
        }

        return fetch(`${serverUrl}${endPoint}`, {
            method: 'GET',
                  
        })
    }

    // export const getServicesApi = 
    // function (): Promise<Response> | null {
    //     if (!verifyToken()) {
    //         return null;
    //     }
        
    //     return fetch(`${serverUrl}`);
    // }
    
    // export const addServiceApi = 
    // function(service: IService): Promise<Response> | null {
    //     if (!verifyToken()) {
    //         return null;
    //     }
    //     return fetch(`${serverUrl}services`, {
    //                 method: "post",
    //                 headers: {
    //                      "Content-Type": "application/json",
                         
    //                 },
    //                 body: JSON.stringify(service),
    //              })
    // }

    // export const updateService =  
    // function(service: IService): Promise<Response> | null {
    //     if (!verifyToken()) {
    //         return null;
    //     }
    //     return fetch(`${serverUrl}services`, {
    //                 method: "put",
    //                 headers: {
    //                      "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(service),
    //              })
    // }

    // export const deleteFromFav = 
    // function(id: string): Promise<Response> | null {
    //     if (!verifyToken()) {
    //         return null;
    //     }
    //     return  fetch(`${serverUrl}item`, {
    //         method: "delete",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ id: id }),
    //       })
    // }
import { baseApi } from "@/shared/api";
import {
    createSessionModel,
    refreshSessionModel,
    clearSessionModel,
    CreateSessionRequest, 
    CreateSessionResponse,
    RefreshSessionRequest,
    ClearSessionRequest
} from "../model/types";

export const sessionApi = baseApi.injectEndpoints({
    endpoints : (build) => ({
        createSession : build.mutation<CreateSessionResponse, CreateSessionRequest>({
            query : (body) => ({
                url    : '/sessions/create',
                method : 'POST',
                model  : createSessionModel,
                body,
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }),
        refreshSession : build.mutation<CreateSessionResponse, RefreshSessionRequest>({
            query : (body) => ({
                url    : '/sessions/resfresh',
                method : 'POST',
                model  : refreshSessionModel,
                body,
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        }),
        clearSession : build.mutation<CreateSessionResponse, ClearSessionRequest>({
            query : (body) => ({
                url    : '/sessions/clear',
                method : 'POST',
                model  : clearSessionModel,
                body,
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
})


export const {
    useCreateSessionMutation,
    useRefreshSessionMutation,
    useClearSessionMutation
} = sessionApi
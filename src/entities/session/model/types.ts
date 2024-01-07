import LIVR from 'livr'

export const createSessionModel = new LIVR.Validator({
    url_name        : [ 'required', 'string' ],
    is_long_session : [ 'required' ]
})

export const refreshSessionModel = new LIVR.Validator({
    url_name        : [ 'required', 'string' ],
    is_long_session : [ 'required' ],
    session_token   : [ 'required', 'string' ]
})

export const clearSessionModel = new LIVR.Validator({
    url_name        : [ 'required', 'string' ],
    session_token   : [ 'required', 'string' ]
})

export interface CreateSessionRequest {
    url_name        : string,
    is_long_session : boolean
}

export interface RefreshSessionRequest extends CreateSessionRequest {
    session_token : string
}

export interface ClearSessionRequest {
    session_token : string,
    url_name      : string,
}

export interface CreateSessionResponse {
    session_token : string
}
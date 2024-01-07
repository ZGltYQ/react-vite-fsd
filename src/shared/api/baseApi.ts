import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { TOKEN } from '@/app/config'
import { formDataToObject, objectToError } from '@/shared/lib/parsers'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery : BaseQueryFn<
string | FetchArgs, 
unknown, 
FetchBaseQueryError,
object,
FetchBaseQueryMeta
> = fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
        const jwt = localStorage.getItem(TOKEN)

        if (jwt) {
            headers.set('Authorization', jwt)
        }

        return headers;
    }
})

export const baseApi = createApi({
    reducerPath : 'api',
    baseQuery   : async ({ model, ...rest }, api, extraOptions): Promise<any> => {
        if (model) {
            let body = rest?.body;

            if (body instanceof FormData) body = formDataToObject(body);

            const validData = model.validate(body);

            if (!validData) return objectToError(model.getErrors());
        }

        const response: any = await baseQuery(rest, api, extraOptions);

        return response
    },
    endpoints   : () => ({})
})
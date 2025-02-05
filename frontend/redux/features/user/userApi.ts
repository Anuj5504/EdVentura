import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: "update-avatar",
                method: "PUT",
                body: { avatar },
                credentials: "include" as const
            })
        }),
        EditProfile: builder.mutation({
            query: ({
                name
            }) => ({
                url: "update-user-info",
                method: "PUT",
                body: { name },
                credentials: "include" as const
            })
        }),
        EditPassword: builder.mutation({
            query: ({
                oldPassword,newPassword
            }) => ({
                url: "update-password",
                method: "PUT",
                body: { oldPassword,newPassword },
                credentials: "include" as const
            })
        })
    })
});

export const { useUpdateAvatarMutation,useEditProfileMutation ,useEditPasswordMutation} = userApi
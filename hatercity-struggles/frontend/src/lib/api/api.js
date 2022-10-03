import makeCall from "./transport"

const callToBackend = {
    loginUser: async (items) => {
        const response = await makeCall("/user/login", "POST", items, false)
        return response
    },
    signupUser: async (items) => {
        const response = await makeCall("/user/signup", "POST", items, false)
        return response
    },
    /**
     * Fetch all the posts 
     */
    getPosts: async () => {
        const response = await makeCall("/post", "GET")
        return response
    },

    /**
     * Get the user depending on their ID
     * @param userid 
     * 
     */
    getUser: async (userid) => {
        const response = await makeCall(`/user/get-user/${userid}`, "GET")
        return response
    },

    /**
     * Update the value of Click-Hate
     * @param items 
     */
    updateClickHate: async (items) => {
        const response = await makeCall("/user/clickhate", "PUT", items)
        return response
    },

    /**
     * Get users depending on their Click-Hate rating
     */
    getClickHateRating: async () => {
        const response = await makeCall("/user/rating", "GET")
        return response
    },

    /**
     * Delete the comment depending on its ID
     * @param postid 
     * @param commentid 
     */
    deleteComment: async (postid, commentid) => {
        const response = await makeCall(`/post/del-comment/${postid}/${commentid}`, "PUT")
        return response
    },

    /**
     * Get the posts of the user depending on their ID
     * @param  userid 
     */
    getPostsOfUser: async (userid) => {
        const response = await makeCall(`/user/get-user/${userid}`, "GET")
        return response
    },

    /**
     * Edit the user's profile
     * @param items 
     */
    editProfile: async (items) => {
        const response = await makeCall("/user/update-user", "PUT", items)
        return response
    },

    /**
     * Follow the user depending on the ID of the wanted user
     * @param userid 
     */
    follow: async (userid) => {
        const response = await makeCall(`/user/follow/${userid}`, "PUT")
        return response
    },

    /**
     * Unfollow the user depending on the ID of the wanted user
     * @param userid 
     */
    unfollow: async (userid) => {
        const response = await makeCall(`/user/unfollow/${userid}`, "PUT")
        return response
    },

    /**
     * Like the post depending on its ID
     * @param postid 
     */
    like: async (postid) => {
        const response = await makeCall(`/post/like/${postid}`, "PUT")
        return response
    },

    /**
     * Unlike the post depending on its ID
     * @param postid 
     */
    unlike: async (postid) => {
        const response = await makeCall(`/post/unlike/${postid}`, "PUT")
        return response
    },

    /**
     * COmment the post depending on its ID
     * @param postid 
     */
    comment: async (postid, items) => {
        const response = await makeCall(`/post/comment/${postid}`, "PUT", items)
        return response
    },

    /**
     * Delete the post depending on its ID
     * @param postid 
     */
    deleteThePost: async (postid) => {
        const response = await makeCall(`/post/${postid}`, "DELETE")
        return response
    },

    /**
     * Get the posts of the user_s the current user is subscribed on
     * @param userid 
     */
    getSubPosts: async (userid) => {
        const response = await makeCall(`/post/subposts/${userid}`, "GET")
        return response
    },

    /**
     * Handle the event 'FORGOT_PASSWORD'
     * @param email 
     */
    handleForgotPass: async (email) => {
        const response = await makeCall("/user/forgot-pass", "POST", email, false)
        return response
    },

    /**
     * Update the user with the following items
     * @param items 
     */
    updateUser: async (items) => {
        const response = await makeCall("/user/update-user", "PUT", items)
        return response
    },

    /**
     * Reset the password of the user; the access token is required
     * @param items 
     * @param token 
     */
    resetPass: async (items, token) => {
        const response = await makeCall("/user/reset-pass", "POST", items, true, token)
        return response
    },

    /**
     * Get the single post depending on its ID
     * @param postid 
     */
    getPost: async (postid) => {
        const response = await makeCall(`/post/${postid}`, "GET")
        return response
    },

    /**
     * Create a new post
     * @param items 
     */
    createPost: async (items) => {
        const response = await makeCall("/post", "POST", items)
        return response 
    }
}

export default callToBackend
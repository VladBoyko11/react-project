import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4fc2eae7-04f0-4729-b803-c38f533d1e92'
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    deleteFollowingUser(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)
    },
    postFollowToUser(id) {
        return instance.post(`follow/${id}`).then(response => response.data)
    }
}

export const profileAPI = {
    getUsers(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response )
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status}).then(response => response)
    }
}

export const authAPI = {
    authorizeUser() {
        return instance.get('auth/me', {withCredentials: true}).then((response) => {
            return response;
        })
    },
    login(email, password, rememberMe) {
        return instance.post('auth/login', {email, password, rememberMe}).then(response => {
            return response
        })
    },
    logout() {
        return instance.delete('auth/login').then(response => response)
    }
}
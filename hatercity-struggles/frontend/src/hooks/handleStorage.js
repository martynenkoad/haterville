const handleStorage = {
    updateUser: (updates) => {
        localStorage.setItem("user", JSON.stringify(updates))
    },
    
    getUser: () => {
        localStorage.getItem("user")
    },

    updateMode: (updates) => {
        localStorage.setItem("mode", updates)
    },

    getMode: () => {
        localStorage.getItem("mode")
    }
}

export default handleStorage
import imgs from "../data/imgData"

const setImage = (profileImageIndex, setProfileImg) => {
        
    imgs.imgData.forEach((img, i) => {
        if(img.id === profileImageIndex) {
            setProfileImg(img.image)
        }
    }) 
}

export default setImage
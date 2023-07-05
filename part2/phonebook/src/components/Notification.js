const Notification = ({notification}) => {
    if (notification.includes("deleted from")){
        return (
            <div className="failure">
                {notification}
            </div>
        )
    }
    else{
        return (
            <div className="success">
                {notification}
            </div>
        )
    }
    
}

export default Notification
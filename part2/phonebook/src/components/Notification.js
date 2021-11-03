const Notification = ({message}) => {
    const type = message[1];

    if(message[0] === null){
        return null
    }
    
    return(
        <div>
            <p className={type}>{message[0]}</p>
        </div>
    )
} 

export default Notification
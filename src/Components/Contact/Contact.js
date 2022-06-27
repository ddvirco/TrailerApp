import './Contact.css';
function ContactComp(){

    return (
        <div className='contact'>
            <h3>Contact us</h3>
            <form action='https://getform.io/f/e5570033-3326-4e42-a808-e6c94d56e7b2'
                    method="POST">
                
                <input type='text' name='name' placeholder='Name' /><br></br>
                
                <input type='email' name='email' placeholder='Email'/><br/>
                <textarea name='message' placeholder='Message..'/><br/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ContactComp
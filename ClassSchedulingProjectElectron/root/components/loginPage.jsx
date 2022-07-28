class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = props
    }
    componentDidMount() {
        centerWindow(document.getElementById("loginPage"))
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
        });
    }
    render(){
        return (
            <div id="loginPage" className="container">
                <br /><br /><br />
                <h1>Class Scheduler</h1>
                <br />
                <p>If you don't already have an account, 
                    <a className="text-primary" href="./createAccount.jsx" target={"_blank"}>
                        {" "}you can create an account here
                </a></p>
                <label className="fillWidth">Email</label><br />
                <input id="email" className="fillWidth" type='text'></input><br />
                <label className="loginLabel fillWidth">Password</label><br />
                <input id="password" className="fillWidth" type='password'></input><br />
                <button style={{marginTop: "16px"}} className="btn btn-primary" onClick={ () => submitLoginDetails(this)}>Submit</button>
            </div>
        )
    }
}
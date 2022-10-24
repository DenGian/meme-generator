// imports
import React, {Component} from 'react';
import "../App.css";

class MemeGenerator extends Component {
    constructor(props) {
        super(props);
        // initializing state so it saves the following
        this.state = {
            topText: '', // initializing as empty string
            bottomText: '', // initializing as empty string
            startingImg: "https://ft-article-images.s3.ap-south-1.amazonaws.com/31_602c94750e.jpg", // starting image - place holder
            allMemes: [] // save results of the fetch in this array - initialize allMemes as an empty array
        };
        // binding the methods in the constructor
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // creating the onChange handler method - this updates the corresponding state on every change in the input box
    // pulling the name and value properties from event.target
    // get the name of the state we are supposed to update
    handleChange(event) {
        const {name, value} = event.target
        // updating the state - providing an object in which we set the [name] to the value typed into the input field
        this.setState({[name]: value})
    }
    // creating a method so when the "Next Meme" button is clicked it chooses one of the memes from the "allMemes" array at random and shows this image
    handleSubmit(event) {
        // preventDefault event so it doesn't refresh the page
        event.preventDefault()
        // getting a random number - to make sure the number exists in the array we multiply by the length of the array
        const randNum = Math.floor(Math.random() * this.state.allMemes.length);
        // setting "randomMemeImg" equal to "allMemes" with the index to the "randNum" we just got then adding the url at the end
        const randMemeImg = this.state.allMemes[randNum].url
        // updating the state by updating the "startingImg" property with randMemeImg
        this.setState({startingImg: randMemeImg})
    }
    // form where user can input the text that will also be shown on the screen of the user
    render() {
        return (
            <div>
                {/*opening form tag*/}
                {/*setting the form's onSubmit equal to the name of handleSubmit method*/}
                <form className='memeForm' onSubmit={this.handleSubmit}>
                    {/*input field for the top text*/}
                    <input
                        type='text'
                        name='topText'
                        {/*placeholder for the top text*/}
                        placeholder='Top Text'
                        {/*setting the value as equal to the current value in state*/}
                        value={this.state.topText}
                        {/*setting the onChange of the input field to equal handleChange*/}
                        onChange={this.handleChange}
                    />
                    {/*input field for the bottom text*/}
                    <input
                        type='text'
                        name='bottomText'
                        placeholder='Bottom Text'
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Next Meme</button>
                </form>
                <div className='meme'>
                    {/*displaying text on the top which is saved in state*/}
                    <h2 className='top'>{this.state.topText}</h2>
                    {/*displaying the image which is initialized as its source by using src={this.state.randomImg}*/}
                    <img src={this.state.startingImg} alt='meme'/>
                    {/*displaying text on the bottom which is saved in state*/}
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
    componentDidMount() { // ensure that data is fetched at the beginning
        fetch("https://api.imgflip.com/get_memes") // call to URL
            .then(response => response.json()) // turn promise into JS object
            .then(response => {
                const {memes} = response.data // pull memes array from response.data
                console.log(memes[0]) // check data is present
                this.setState({allMemes: memes}) // set allMemes state
            })
    }
}

export default MemeGenerator;
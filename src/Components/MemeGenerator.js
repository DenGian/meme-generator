import React, {Component} from 'react';
import "../App.css";

class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            startingImg: "https://ft-article-images.s3.ap-south-1.amazonaws.com/31_602c94750e.jpg",
            allMemes: []
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemes.length);
        const randMemeImg = this.state.allMemes[randNum].url
        this.setState({startingImg: randMemeImg})
    }
    render() {
        return (
            <div>
                <form className='memeForm' onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='topText'
                        placeholder='Top Text'
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
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
                    <h2 className='top'>{this.state.topText}</h2>
                    <img src={this.state.startingImg} alt='meme'/>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
    componentDidMount() { //ensure that data is fetched at the beginning
        fetch("https://api.imgflip.com/get_memes") //call to URL
            .then(response => response.json()) //turn promise into JS object
            .then(response => {
                const {memes} = response.data //pull memes array from response.data
                console.log(memes[0]) // check data is present
                this.setState({allMemes: memes}) // set allMemes state
            })
    }
}

export default MemeGenerator;
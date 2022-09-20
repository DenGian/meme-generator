// imports
import './App.css'; // styling
import React from 'react'; // React
import Header from "./Components/Header" // header
import MemeGenerator from "./Components/MemeGenerator"; // form + images
import Footer from "./Components/Footer"; // footer


export default function App() {
    return (
        <React.StrictMode>
            <div className="App">
                <Header/>
                <MemeGenerator/>
                <Footer/>
            </div>
        </React.StrictMode>
    );
}



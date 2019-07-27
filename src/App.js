import React, { Component } from "react";
import Clarifai from "clarifai";
import Logo from "./components/Logo/Logo";
import Tags from "./components/Tags/Tags";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLınkForm from "./components/ImageLınkForm/ImageLınkForm";
import Particles from "react-particles-js";
import "./App.css";
import "./components/Tags/Tags.css";
const app = new Clarifai.App({ apiKey: "3b14d6679bbd43ba9562af6ef36a0601" });
const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgaeUrl: "",
      box: {},
      tag: {}
    };
  }

  analyseTags = data => {
    let nametags = `<h2  class='pa2 white center'> </h2>`;
    data.outputs[0].data.concepts.forEach(element => {
      console.log(element.name);
      nametags += `
      <li class='pa3 ma3 dim shadow-5 center tagsss'>#${element.name}</li>
      <br>
      `;

      document.getElementById("tag-output").innerHTML = nametags;
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    console.log(box);

    this.setState({ box: box });
  };
  displayTagBox = tag => {
    console.log(tag);

    this.setState({ tag: tag });
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };
  onTagsButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.GENERAL_MODEL, this.state.input)
      .then(response => this.displayTagBox(this.analyseTags(response)))
      .catch(err => console.log(err));
  };
  onDetectButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className='App'>
        <Particles params={particlesOptions} className='particles' />
        <Logo />
        {/*eslint-disable-next-line*/}
        <ImageLınkForm
          onInputChange={this.onInputChange}
          onDetectButtonSubmit={this.onDetectButtonSubmit}
          onTagsButtonSubmit={this.onTagsButtonSubmit}
        />
        <Tags />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

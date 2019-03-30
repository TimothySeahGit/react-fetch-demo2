import React, { Component } from "react";
import unsplash from "./service/unsplash";
import Card from "./components/Card/Card";

class App extends Component {
  state = {
    resultList: []
  };
  handleClick = () => {};

  async componentDidMount() {
    const fs = require("fs");

    const searchTerm = "";
    const response = await unsplash.get("/api/v1/gangs/Ku Klutz Katz/", {
      params: { query: searchTerm }
    });
    const description = response.data.description;
    const logo = response.data.logo;
    console.log(response);

    const mugshots = response.data.members[0].mugshot.data.data;
    console.log(response.data.members[0].mugshot);

    var blobby = new Blob([new Uint8Array(mugshots)]);
    // var blobToFile = (theBlob, fileName) => {
    //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
    //   theBlob.lastModifiedDate = new Date();
    //   theBlob.name = fileName;
    //   return theBlob;
    // };

    var objectURL = URL.createObjectURL(blobby);

    console.log(objectURL);
    var image = new Image();
    image.src = objectURL;

    // tryagain = URL.createObjectURL(imageSource);
    const memberNames = [];
    const mugshotsArray = [];
    response.data.members.forEach(member => {
      memberNames.push(member.name);
      mugshotsArray.push(member.mugshot);
    });

    console.log(mugshotsArray);
    this.setState({
      resultList: memberNames,
      imageSource: objectURL
    });
  }

  render() {
    const { resultList, imageSource } = this.state;
    return (
      <div className="container">
        {resultList.map(result => (
          <Card
            imageUrl={imageSource}
            title={result}
            buttonPress={this.handleClick}
          />
        ))}
        {resultList.map(result => (
          <Card
            imageUrl={imageSource}
            title={result}
            buttonPress={this.handleClick}
          />
        ))}
      </div>
    );
  }
}

export default App;

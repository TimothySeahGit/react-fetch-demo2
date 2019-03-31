import React, { Component } from "react";
import unsplash from "./service/unsplash";
import Card from "./components/Card/Card";

class App extends Component {
  state = {
    resultList: []
  };
  handleClick = e => {
    const item = this.getSuspects(e).then(item => {
      console.log(item);
      console.log(item.mugshot);
      this.setState({ resultList: [e], imageSource: item.mugshot });
    });
  };

  getGang = async gang => {
    const response = await unsplash.get(`/api/v1/gangs/${gang}`);

    const description = response.data.description;
    const logo = response.data.logo;
    const members = response.data.members;

    const blob = new Blob([new Uint8Array(logo)]);
    const objectURL = URL.createObjectURL(blob);

    return { description: description, logo: objectURL, members: members };
  };

  getMembersFromGang = gang => {
    const members = gang.members;
  };

  getSuspects = async suspect => {
    const response = await unsplash.get(`/api/v1/suspects/${suspect}`);
    console.log("running");
    const description = response.data.description;
    const mugshot = response.data.mugshot.data.data;
    const gang = response.data.gang;

    const blob = new Blob([new Uint8Array(mugshot)]);
    const objectURL = URL.createObjectURL(blob);

    return { description: description, mugshot: objectURL, gang: gang };
  };

  async componentDidMount() {
    const gang = this.getGang("Ku Klutz Katz").then(obj => {
      this.gang = obj;
      console.log(this.gang);
    });
    // console.log(gang);

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
      </div>
    );
  }
}

export default App;

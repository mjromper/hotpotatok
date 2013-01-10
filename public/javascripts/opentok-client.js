window.onload = function(){
  var session = TB.initSession(sessionId); // Sample session ID. 
			
	session.addEventListener("sessionConnected", sessionConnectedHandler);
	session.addEventListener("streamCreated", streamCreatedHandler);
	session.connect(apikey, token); // OpenTok sample API key and sample token string. 

  console.log('Exec client!');

  function sessionConnectedHandler(event) {
     subscribeToStreams(event.streams);
     var divProps = {width: 400, height:300, name:"Bob's stream"};
     publisher = TB.initPublisher(apikey, 'myStream', divProps);
     session.publish(publisher);
  }

  function streamCreatedHandler(event) {
    subscribeToStreams(event.streams);
  }

  function subscribeToStreams(streams) {
    for (i = 0; i < streams.length; i++) {
      var stream = streams[i];
      if (stream.connection.connectionId != session.connection.connectionId) {
        displayStream(stream);
      }
    }
  }


  function sessionConnectHandler(event) {
    console.log('sessionConnectHandler');
    for (var i = 0; i < event.streams.length; i++) {
        var stream = event.streams[i];
        displayStream(stream);
    }
  }

  function displayStream(stream) {
      console.log('displayStream = '+stream.streamId);
      var div = document.createElement('div');
      div.setAttribute('id', 'stream' + stream.streamId);
      var streamsContainer = document.getElementById('streamsContainer');
      streamsContainer.appendChild(div);
      //subscriber = session.subscribe(stream, 'stream' + stream.streamId);
      session.subscribe(stream, 'stream' + stream.streamId);
  }


}

import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { messageUrl, roomUrl } from "../../components/Urls";
import {
  chatMessage,
  removeChatUserMessages,
  chatMessageArray
} from "../../components/Redux/actions/chatMessageAction";
import { removeChatUser } from "../../components/Redux/actions/chatRoomAction";
import * as Icon from "@expo/vector-icons";
import ReportModal from "../../components/ReportModal";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messageInTextInput: "",
      room: -99,
      modalVisible: false,
      reportText: "",
      reportReason: "",
      loadedMessages:[]
    };
  }

  _setModalVisible = () => {
    console.log("visible called");
    this.setState({ modalVisible: true });
  };
  setReportText(text) {
    this.setState({ reportText: text });
  }
  cancelReport() {
    this.setState({ modalVisible: false });
  }
  sendReport() {
    if (this.state.reportText != "" && reportText != "") {
      fetch(reportsUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json; charset=UTF-8",
          "WWW-Authenticate": this.props.personalDataReducer.owner
        },
        body: JSON.stringify({
          owner: this.props.personalDataReducer.id,
          reportedReason: this.state.reportReason,
          reportedUser: reportText
        })
      });
      this.setState({ modalVisible: false });
      Alert.alert(
        "Report sent!",
        "Would you like to remove user as well? ",

        [
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.removeMatch() }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Please fill in both fields!");
    }
  }
  componentWillMount() {
    this.props.navigation.setParams({ setModalVisible: this._setModalVisible });
  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const name = navigation.getParam("name", "Something went wrong");
    const chatPartnerID = navigation.getParam(
      "chatPartnerID",
      "Something went wrong"
    );

    return {
      headerTitle: (
        <View style={[styles.row, { marginRight: -30 }]}>
          <View style={{ flex: 2 }}></View>

          <TouchableOpacity style={{ flex: 1 }} onPress={params.viewProfile}>
            <Text style={{ alignSelf: "center", fontSize: 20 }}>{name}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>

          <Icon.Ionicons
            onPress={params.options}
            name={Platform.OS === "ios" ? "ios-more" : "md-more"}
            size={27}
            color={"black"}
            style={{ flex: 2, alignSelf: "flex-end", marginRight: -30 }}
          />
        </View>
      )
    };
  };
  componentWillMount() {
    this.props.navigation.setParams({
      viewProfile: this._viewProfile,
      options: this._options
    });
    const { navigation } = this.props;

    const chatPartnerID = navigation.getParam(
      "chatPartnerID",
      "Something went wrong"
    );
    this.setState({ room: chatPartnerID });
  }
  _options = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Report", onPress: () => this.reportMatch() },

        { text: "Remove", onPress: () => this.removeMatch() }
      ],
      { cancelable: false }
    );
  };
  reportMatch() {
    this.setState({ modalVisible: true });
  }
  removeMatch() {
    fetch(matchUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json; charset=UTF-8",
        "WWW-Authenticate": this.props.personalDataReducer.owner
      },
      body: JSON.stringify({
        owner: this.props.personalDataReducer.id,
        possiblePartners: this.props.chatRoomReducer[this.state.room].id,
        ownerLikesPossiblePartner: false
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
    fetch(roomUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json; charset=UTF-8",
        "WWW-Authenticate": this.props.personalDataReducer.owner
      }
    }).catch(error => console.log(error));

    this.props.dispatch(removeChatUserMessages(this.state.room));
    this.props.dispatch(removeChatUser(this.state.room));
    this.props.navigation.navigate("Home");
  }

  _viewProfile = () => {
    const { navigation } = this.props;

    const chatPartnerID = navigation.getParam(
      "chatPartnerID",
      "Something went wrong"
    );
    const name = navigation.getParam("name", "Something went wrong");

    this.props.navigation.navigate("ChatProfile", {
      chatPartnerID: chatPartnerID,
      name: name
    });
    console.log(this.state.room + "asdsad");
  };

  send(owner, message, room) {
    let now = Date.now();
    console.log(
      "CHATRROMRED" +
        JSON.stringify(this.props.chatMessageReducer[this.state.room])
    );
    if (this.props.chatMessageReducer[this.state.room] != undefined) {
      let chatMsg = {
        index: this.state.room,
        message: { message: message, sender: owner, timestamp: now, room: room }
      };

      this.props.dispatch(chatMessage(chatMsg));
    } else {
      let chatMsg = {
        index: this.state.room,
        messages: [
          { message: message, sender: owner, timestamp: now, room: room }
        ]
      };

      this.props.dispatch(chatMessageArray(chatMsg));
    }

    fetch(messageUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json; charset=UTF-8",
        "WWW-Authenticate": this.props.personalDataReducer.owner
      },
      body: JSON.stringify({
        sender: owner,
        message: message,
        timestamp: now,
        room: room,
        reciever: this.props.chatRoomReducer[this.state.room].id
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
      })
      .catch(error => console.log(error));
    this.setState({ messageInTextInput: "" });
    this.refs.scrollView.scrollToEnd();
  }
  changeValueOfButton = (valueBeingChanged, functionUsed) => {
    console.log(
      "if the value is changed remove a shit ton of stupid functiuons"
    );
    if (valueBeingChanged === false) {
      this.props.dispatch(functionUsed(true));
    } else {
      this.props.dispatch(functionUsed(false));
    }
  };
  calculateDateOfMessage(timeSent) {
    let now = Date.now();
    timeSent = parseInt(timeSent);
    let differanceBetweenNowAndTimeSent = now - timeSent;
    let day = differanceBetweenNowAndTimeSent / 86400000;
    timeSent = new Date(timeSent);
    if (day > 1 && day < 365) {
      let date = timeSent.getDate();
      let month = timeSent.getMonth();
      return (
        <Text style={styles.timestamp}>
          {date}/{month}
        </Text>
      );
    } else if (day > 365) {
      let date = timeSent.getDate();
      let month = timeSent.getMonth();
      let year = timeSent.getFullYear();
      return (
        <Text style={styles.timestamp}>
          {date}/{month}/{year}
        </Text>
      );
    } else {
      let hours = timeSent.getHours();
      let minutes = timeSent.getMinutes();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return (
        <Text style={styles.timestamp}>
          {hours}:{minutes}
        </Text>
      );
    }
  }
  Messages() {
    if (this.props.chatMessageReducer[this.state.room] != undefined) {
      let numberloaded = this.state.loadedMessages.length;
      let numberTotal = this.props.chatMessageReducer[this.state.room].length -1 ;
      let iterator = numberTotal -numberloaded;
      let newMessages  =[]
      console.log(iterator + " " + this.props.chatMessageReducer[this.state.room].length + " " +this.state.loadedMessages.length)
      for (let i = 0; i <15 ; i++) {
        newMessages.push(
          <View
          key={iterator}
          style={[
            styles.messageContainer,
            this.props.chatMessageReducer[this.state.room][iterator].sender == this.props.personalDataReducer.id
              ? { alignSelf: "flex-start", backgroundColor: "light-grey" }
              : { alignSelf: "flex-end", backgroundColor: "red" }
          ]}
        >
          {this.calculateDateOfMessage(this.props.chatMessageReducer[this.state.room][iterator].timestamp)}
          <View>
            <Text>{this.props.chatMessageReducer[this.state.room][iterator].message}</Text>
          </View>
        </View>
                

        )
     
    }
/*
      console.log(JSON.stringify(this.props.chatMessageReducer[this.state.room]))
      return this.props.chatMessageReducer[this.state.room].map(
        (message, i) => (
          <View
            key={i}
            style={[
              styles.messageContainer,
              message.sender == this.state.reciever
                ? { alignSelf: "flex-start", backgroundColor: "light-grey" }
                : { alignSelf: "flex-end", backgroundColor: "red" }
            ]}
          >
            {this.calculateDateOfMessage(message.timestamp)}
            <View>
              <Text>{message.message}</Text>
            </View>
          </View>
        )
      );*/
    } else {
      return (
        <Text
          style={{
            alignSelf: "center",
            fontSize: 14,
            fontWeight: "300",
            color: "grey"
          }}
        >
          Write something fun!
        </Text>
      );
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled
        keyboardVerticalOffset={105}
      >
   
        <ReportModal
          visibility={this.state.modalVisible}
          cancelFunction={() => this.cancelReport()}
          userName={this.props.name}
        />
        <View style={styles.scrollViewHolder}>
          <ScrollView
            ref="scrollView"
            style={styles.contentContainer}
            onContentSizeChange={() => {
              this.refs.scrollView.scrollToEnd({ animated: false });
            }}
          >
            {this.Messages()}
          </ScrollView>
        </View>
        <View style={styles.chatRow}>
          <TextInput
            placeholder={"Write someting"}
            maxLength={10000}
            style={styles.textInput}
            onChangeText={text => this.setState({ messageInTextInput: text })}
            multiline={true}
            ref="TextInput"
            value={this.state.messageInTextInput}
            numberOfLines={8}
          />

          <TouchableOpacity
            style={styles.send}
            onPress={() =>
              this.send(
                this.props.personalDataReducer.id,
                this.state.messageInTextInput,
                this.state.room
              )
            }
          >
            <Text>Send!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  chatRoomReducer: state.chatRoomReducer,
  personalDataReducer: state.personalDataReducer,
  chatMessageReducer: state.chatMessageReducer
});

export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff"
  },

  messageContainer: {
    borderRadius: 10,
    padding: 7,
    margin: 2,
    maxWidth: "75%"
  },
  textInput: {
    height: 60,
    // width:330,
    flex: 7,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "red"
  },
  send: {
    flex: 1,
    height: 40,
    width: 40,
    padding: 12
  },
  timestamp: {
    fontWeight: "100",
    fontSize: 10
  },

  chatRow: {
    flexDirection: "row",
    position: "absolute",
    bottom: 12,

    left: 12
  },
  row: {
    flexDirection: "row"
  },

  contentContainer: {},

  scrollViewHolder: {
    height: 645,
    paddingTop: 10,
    paddingBottom: 10
  },

  flexOne: {
    flex: 1
  },

  rowFlexOne: {
    flexDirection: "row",
    flex: 1
  },
  messageTextOwnerSent: {
    textAlign: "right",
    flex: 1,
    fontSize: 13
  },
  messageTextOwnerRecieved: {
    textAlign: "left",
    flex: 1,
    fontSize: 13
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    paddingBottom: 15,
    paddingTop: 15
  },
  //299 full length
  yesButton: {
    backgroundColor: "green",
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  noButton: {
    backgroundColor: "red",
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    margin: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  reportUserButton: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "black",
    margin: 1,
    alignSelf: "flex-end",
    alignItems: "flex-end",
    padding: 4,
    justifyContent: "flex-end",
    marginBottom: 6
  },
  reportUserText: {
    color: "black",
    fontWeight: "200",
    fontSize: 15
  },
  rowHeight: {
    flexDirection: "row",
    paddingTop: 8
  },
  reportName: { fontSize: 23, margin: 30, textAlign: "center" },
  timeOwnerSent: {
    fontSize: 7,
    textAlign: "right",
    flex: 1
  },
  timeOwnerRecieved: {
    fontSize: 7,
    textAlign: "left",
    flex: 1
  },
  chatBubbleOwnerSent: {
    alignItems: "flex-end",
    margin: 5
  },
  chatBubbleOwnerRecived: {
    alignItems: "flex-start",
    margin: 5
  },

  personalityTypeImg: {
    width: 60,
    height: 60
  }
});

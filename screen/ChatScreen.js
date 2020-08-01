import React, { Component } from 'react'
import { Platform,KeyboardAvoidingView,SafeAreaView,View,Text } from 'react-native';
import {GiftedChat, Message} from 'react-native-gifted-chat'
import Fire from '../database/firebase.js'
import RNWhatsAppStickers from "react-native-whatsapp-stickers"
import { stickerConfig } from '../stikers.js';
const { stickers, ...packConfig } = stickerConfig
RNWhatsAppStickers.isWhatsAppAvailable()
.then(isWhatsAppAvailable => {
if (isWhatsAppAvailable) {
  if (Platform.OS === 'ios') {
    return RNWhatsAppStickers.createStickerPack(packConfig)
      .then(() => {
        const promises = stickers.map(item =>
          RNWhatsAppStickers.addSticker(item.fileName, item.emojis)
        )
        Promise.all(promises).then(() => RNWhatsAppStickers.send())
      })
      .catch(e => console.log(e))
  }

  return RNWhatsAppStickers.send('myprojectstickers', 'MyProject Stickers')
}

return undefined
})
.catch(e => console.log(e))

export default class Chat extends React.Component{
    state={
        messages:[]
    }
   
    get user(){
        return{
            _id:Fire.uid,
            
        }
        
    }
    componentDidMount(){
        Fire.get(message=>this.setState(previous=>({
            messages:GiftedChat.append(previous.messages,message)
        }))
        );
    }
    componentWillMount(){
        Fire.off()
    }
    render(){
        const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>;
        if(Platform.OS==='android'){
            return(
                <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={30} enabled >
                {chat}
                </KeyboardAvoidingView>
                )
                
        }
        
        return <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
    }
}
import React,{useState,useEffect} from "react";
import {Text,View ,StyleSheet,Platform,Dimensions,TouchableOpacity} from "react-native"
import { useSelector } from "react-redux";
import API from "../../../../../Constants/BackendAPI";
import ProductSkeleton from "../../../Home/Products/Skeleton/Product.Skeleton";
import Header from "./Header";
import LoginRedirect from "../Login/LoginRedirect";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userType } from '../CreateAccount/data/usertypes';
import EmptyComponent from "../../../../../Components/EmptyComponent/EmptyComponent";
import SignInButton from "../../../../../Components/GetStartedButton";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const fontScale = Dimensions.get('window').fontScale;



const ManageProfile = () =>
{
    const isLoggedIn = useSelector((data)=>data.appState.isLoggedIn)
    const userID =  useSelector((data)=>data.appState.userID)
    const [state, setState] = useState();
    const [isLoading, setLoading] = useState(true);

    const navigation = useNavigation();

    
    const Profile = ({state}) =>{
      return(     
          <View style={style.container}>
               <Text style={{color:"black",fontSize:20,fontWeight:"600",textAlign:"center",margin:10}}>Manage Your Profile</Text>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20,marginLeft:10,marginRight:20}}>
                   <Text style={{color:"black",fontSize:25,fontWeight:"600"}}>{state[0].name===null?"name":state[0].name}</Text>
                     <TouchableOpacity
                        onPress={()=>navigation.navigate("updateprofile",{"fieldName":"name","fieldData":state[0].name})}
                       >
                        <AntDesign name="edit" size={24} color="black" />
                   </TouchableOpacity>
                  
            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20,marginLeft:10,marginRight:20}}>
                   <Text style={{color:"black",fontSize:15,fontWeight:"600"}}>{state[0].address===null?"Address":state[0].address}</Text>
                     <TouchableOpacity
                          onPress={()=>navigation.navigate("updateprofile",{"fieldName":"address","fieldData":state[0].address})}
                       >
                        <AntDesign name="edit" size={24} color="black" />
                   </TouchableOpacity>
                  
            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20,marginLeft:10,marginRight:20}}>
                   <Text style={{color:"black",fontSize:15,fontWeight:"600"}}>{state[0].city===null?"City":state[0].city}</Text>
                     <TouchableOpacity
                         
                         onPress={()=>navigation.navigate("updateprofile",{"fieldName":"city","fieldData":state[0].city})}
                       >
                        <AntDesign name="edit" size={24} color="black" />
                   </TouchableOpacity>
                  
            </View>
       
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20,marginLeft:10,marginRight:20}}>
                   <Text style={{color:"black",fontSize:15,fontWeight:"600"}}>{state[0].country===null?"Country":state[0].country}</Text>
                     <TouchableOpacity
                       
                       onPress={()=>navigation.navigate("updateprofile",{"fieldName":"country","fieldData":state[0].country})}
                       >
                        <AntDesign name="edit" size={24} color="black" />
                   </TouchableOpacity>
                  
            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20,marginLeft:10,marginRight:20}}>
                   <Text style={{color:"black",fontSize:15,fontWeight:"600"}}>{state[0].postal_code===null?"Postal code":state[0].postal_code}</Text>
                     <TouchableOpacity
                         onPress={()=>navigation.navigate("updateprofile",{"fieldName":"postal_code","fieldData":state[0].postal_code})}
                       >
                        <AntDesign name="edit" size={24} color="black" />
                   </TouchableOpacity>
                  
            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:20,marginLeft:10,marginRight:20}}>
                   <Text style={{color:"black",fontSize:15,fontWeight:"600"}}>{state[0].phone===null?"Phone number":state[0].phone}</Text>
                     <TouchableOpacity
                           onPress={()=>navigation.navigate("updateprofile",{"fieldName":"phone","fieldData":state[0].phone})}
                       >
                        <AntDesign name="edit" size={24} color="black" />
                   </TouchableOpacity>
                  
            </View>
       
          </View>
         )
    }

    const FetchUserData= async () =>{
      
      const requestOptions = {
        method: 'POST',
        Accept:'application/json',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"id":`${userID}`})
         };
  
       try {
        const response = await fetch(`${API.BASE_URL}/getuser`,requestOptions)
        const data = await response.json();
        setState(data)
      } 
      catch (error) {
        console.error(error);
  
      }finally{
          setLoading(false);
      }
    }
    useEffect(() => 
    {
       FetchUserData();    
    
    }, []);

    return (
        <View style={{height:"100%",}}>  
             <Header />  
             {
             isLoggedIn?<>{isLoading?<ProductSkeleton isLoading={isLoading} />:<Profile state = {state}  />}</>:<LoginRedirect />
             }
        </View>
    );
}

const style = StyleSheet.create({

    container:{
      width: "100%",  
      paddingTop:10
      
    },
    button: {
      position: 'absolute',
      width: 30,
      height: 30,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      right: 50,
      bottom: 30,
      top:0,
      color:"red",
  
    },
    arrow: {
      fontSize: 68,
    },
      tinyLogo: {
      width: 170,
      height: 60,
      marginLeft:100
    }
  })
  

export default ManageProfile;
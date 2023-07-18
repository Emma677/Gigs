import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const Location = () => {
const [currentLocation,setCurrentLocation]=useState('location loading')
const [LocationEnabled,setLocationEnabled]=useState(false)
    useEffect(()=>{
        checkIfServiceEnabled();
        getCurrentLocation();
    },[])

    const checkIfServiceEnabled = async () =>{
        let enabled = await Location.hasServicesEnabledAsync()

        if(!enabled){
            Alert.alert('Location not enabled',
            'enabled lovation pls'
            [
                {text:'cancel',
                 onPress:()=>console.log('cancel pressed')
            },
            {text:'ok',
              onPress:()=>console.log('ok pressed')
        }
            ],
            {cancelable:false}
            )
        }else{
            setLocationEnabled(enabled)
        }
    }

    const getCurrentLocation = async () =>{
        let {status} = await Location.requestForegroundLocationAsync();

        if(status !== granted){
            Alert.alert('Grant Permission',
            'give permission'
            [
                {text:'cancel',
                 onPress:()=>console.log('cancel pressed')
            },
            {text:'ok',
              onPress:()=>console.log('ok pressed')
        }
            ],
            {cancelable:false}
            )
        }
        const {coords} = Location.getCurrentLocationAsync()

        if (coords){
            const {latitude, longitude} = coords

            let response = await Location.reverseGeoCodeAsync({
                latitude,
                longitude
            })
            for(items of response){
                let address = `${item.name} ${item.street} ${item.street}`
                setCurrentLocation(address)
            }
        }
    }
  return (
    <View>
      <Text>{currentLocation}</Text>
    </View>
  )
}

export default Location
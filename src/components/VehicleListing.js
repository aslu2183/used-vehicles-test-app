import {Text, View,Dimensions} from 'react-native'
import { Card } from '@rneui/themed'

export default function VehicleListing(props){
    
    const {width} = Dimensions.get('window');
    return(
        <View style={{flexDirection:'row',flexWrap:'wrap',marginBottom:15}}>
            {
                props.vehicle.map((item,i) => {
                    return (
                        <View style={{width : (width / 2)}} key={i}>
                            <View>
                               <Card>
                                    <Card.Image
                                        style={{ padding: 0 }}
                                        source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                        }}
                                    />
                                    <Text style={{ marginBottom: 10 }}>
                                        The idea with React Native Elements is more about component
                                        structure than actual design.
                                    </Text>
                                </Card>
                            </View>
                            
                        </View>
                    )
                })
            }
            
        </View>
    )
}
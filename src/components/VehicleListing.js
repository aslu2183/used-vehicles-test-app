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
                                            uri:item.vehicle_image_url,
                                        }}
                                    />
                                    <View style={{ marginBottom: 10,marginTop:10 }}>
                                        <Text style={{fontSize:15,color:'black',fontWeight:'bold'}}>{item.name}</Text>
                                        <Text style={{fontWeight:'bold'}}>{item.category.name}</Text>
                                    </View>
                                </Card>
                            </View>
                            
                        </View>
                    )
                })
            }
            
        </View>
    )
}
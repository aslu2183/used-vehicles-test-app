export const formatted_data = (data=[]) => {
    
    return data.map((item) => {
        return {
            label : item.name,
            value : item.id,
            count : item.vehicle_count,
            items : formatted_data(item?.brand || item?.model || item?.variant)
        }    
    })
}
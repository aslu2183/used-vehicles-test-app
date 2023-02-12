export const formatted_data = (data) => {
    
    return data.map((item) => {
        return {
            label : item.name,
            value : item.id,
            count : item.vehicle_count,
            items : item?.brand?.map((brand) => {
                return {
                    label : brand.name,
                    value : brand.id,
                    count : brand.vehicle_count,
                    items : brand?.model?.map((model) => {
                        return {
                            label : model.name,
                            value : model.id,
                            count : model.vehicle_count,
                            items : model?.variant?.map((variant) => {
                                return {
                                    label : variant.name,
                                    value : variant.id,
                                    count : variant.vehicle_count,
                                    items : []
                                }
                            })||[]
                        }
                    })||[]
                }
            })||[] 
        }    
    })
}
const checkDevelopment = ()=>{
    return process.env.ENV ==='DEVELOPMENT'
}

const operations= {
    'ADD':'ADD',
    'MINUS':'MINUS',
    'DELETE':`DELETE`
}

const Add_to_cart_operations = (q)=>{
        return operations[q]
}

const Categoriesoperations = {
    'STATUS':'STATUS',
    'DELETE':'DELETE',
    'DELETE_SUB_CATEGORY':'DELETE_SUB_CATEGORY',
}

const isPublishedState= {
    'UNDER_REVIEW':'UNDER_REVIEW',
    'REJECTED':'REJECTED',
    'PUBLISHED':'PUBLISHED',
}


const status_enum = {
    'PENDING':'PENDING',
    'DISPATCH':'DISPATCH',
    'CANCEL':'CANCEL',
    'DELIVERED':'DELIVERED'
}


const payment_type = {
    'CASH':'CASH',
    'ONLINE':'ONLINE'
}



const defaultCheckout= {
    isPaymentDone:false,
    isDeliverDone:false,
    isOrderCancel:false,
    isPresent:true
}



module.exports = {
    checkDevelopment,
    Add_to_cart_operations,
    operations,
    Categoriesoperations,
    isPublishedState,
    status_enum,
    payment_type,
    defaultCheckout

}



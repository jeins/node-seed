
module.exports = {
    tableName : 'purchases',

    //Column
    id: {
        f: 'id',
        type: 'INTEGER'
    },
    userId: {
        f: 'userId',
        type: 'INTEGER'
    },
    productId: {
        f: 'productId',
        type: 'INTEGER'
    },
    amount: {
        f: 'amount',
        type: 'INTEGER'
    },
    totalPrice: {
        f: 'totalPrice',
        type: 'DOUBLE'
    },
    updated_at: {
        f: 'updatedAt',
        type: 'DATE'
    },
    created_at: {
        f: 'createdAt',
        type: 'DATE'
    }
};
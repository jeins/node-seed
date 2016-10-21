
module.exports = {
    tableName : 'products',

    //Column
    id: {
        f: 'id',
        type: 'INTEGER'
    },
    product: {
        f: 'product',
        type: 'STRING'
    },
    name: {
        f: 'name',
        type: 'STRING'
    },
    price: {
        f: 'price',
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
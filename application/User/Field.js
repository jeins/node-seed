
module.exports = {
    tableName : 'users',

    //Column
    id: {
        f: 'id',
        type: 'INTEGER'
    },
    fullName: {
        f: 'fullName',
        type: 'STRING'
    },
    email: {
        f: 'email',
        type: 'STRING'
    },
    password: {
        f: 'password',
        type: 'STRING'
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
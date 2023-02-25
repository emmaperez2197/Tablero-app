
const ticket_data_complete = (filters = {}) => [
    {
        $lookup: {
            from: 'users',
            localField: 'informer',
            foreignField: '_id',
            as: 'informerUser'
        }
    },
    {
        $lookup: {
            from: 'colums',
            localField: 'idColum',
            foreignField: '_id',
            as: 'colum'
        }
    },
    {$unwind: '$informerUser'},
    {$unwind: '$colum'},
    {$match: filters}
]

module.exports =  {
    ticket_data_complete
}
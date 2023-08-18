const data = [
    {
        title: 'title 1',
        author: 'user 1',
        content: 'test content 1',
        date: '2023-01-22',
    },
    {
        title: 'title 2',
        author: 'user 2',
        content: 'test content 2',
        date: '2023-02-19',
    },
    {
        title: 'title 3',
        author: 'user 3',
        content: 'test content 3',
        date: '2021-10-02',
    },
    {
        title: 'title 4',
        author: 'user 4',
        content: 'test content 4',
        date: '2021-11-09',
    },
    {
        title: 'title 5',
        author: 'user 5',
        content: 'test content 5',
        date: '2021-11-09',
    },
    {
        title: 'title 6',
        author: 'user 6',
        content: 'test content 6',
        date: '2021-11-09',
    },
]

export default function mockData (req, res) {
    res.status(200).json(data)
}
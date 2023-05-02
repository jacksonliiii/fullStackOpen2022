const listHelper = require('../utils/list_helper')

describe('dummy', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('totalLikes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 7,
            __v: 0
        }
    ]

    test('of empty list', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('of list with one entry', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })

    test('of list with many entry', () => {
        expect(listHelper.totalLikes(listWithManyBlog)).toBe(5 + 6 + 7)
    })
})

describe('favoriteBlog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 7,
            __v: 0
        }
    ]

    test('of empty list', () => {
        expect(listHelper.favoriteBlog([])).toEqual(null)
    })

    test('of list with one entry', () => {
        expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        )
    })

    test('of list with many entry', () => {
        expect(listHelper.favoriteBlog(listWithManyBlog)).toEqual(
            {
                _id: '5a422aa71b54a676234d17f0',
                title: 'Go To Statement Considered Harmful 3',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 7,
                __v: 0
            }
        )
    })
})

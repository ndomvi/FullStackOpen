const listHelper = require('../utils/list_helper')

describe('dummy test', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const emptyList = []
  const singleElementList = [
    {
      _id: '123123123',
      title: 'test1',
      author: 'yes',
      url: 'http://example.com/1',
      likes: 4,
      __v: 0
    }
  ]
  const multipleElementList = [
    {
      _id: '321321312',
      title: 'test1',
      author: 'yes',
      url: 'http://example.com/1',
      likes: 4,
      __v: 0
    },
    {
      _id: '123123123',
      title: 'test2',
      author: 'yes1',
      url: 'http://example.com/2',
      likes: 6,
      __v: 0
    },
    {
      _id: '543453453453',
      title: 'test3',
      author: 'yes2',
      url: 'http://example.com/3',
      likes: 5,
      __v: 0
    }
  ]

  test('of an empty list is zero', () => {
    listHelper.totalLikes(emptyList)
  })
  test('of list with 1 element is correct', () => {
    expect(listHelper.totalLikes(singleElementList)).toEqual(4)
  })
  test('of list with multiple elements is correct', () => {
    expect(listHelper.totalLikes(multipleElementList)).toBe(15)
  })
})
describe('most likes', () => {
  const emptyList = []
  const singleElementList = [
    {
      _id: '123123123',
      title: 'test1',
      author: 'yes',
      url: 'http://example.com/1',
      likes: 4,
      __v: 0
    }
  ]
  const multipleElementList = [
    {
      _id: '321321312',
      title: 'test1',
      author: 'yes',
      url: 'http://example.com/1',
      likes: 4,
      __v: 0
    },
    {
      _id: '123123123',
      title: 'test2',
      author: 'yes1',
      url: 'http://example.com/2',
      likes: 6,
      __v: 0
    },
    {
      _id: '543453453453',
      title: 'test3',
      author: 'yes2',
      url: 'http://example.com/3',
      likes: 5,
      __v: 0
    }
  ]

  test('of an empty list is an empty element', () => {
    expect(listHelper.favoriteBlog(emptyList)).toEqual({})
  })
  test('of a list with single element is that element', () => {
    expect(listHelper.favoriteBlog(singleElementList)).toEqual(singleElementList[0])
  })
  test('of a list with multiple elements is correct', () => {
    expect(listHelper.favoriteBlog(multipleElementList)).toEqual(multipleElementList[1])
  })
})
/*
describe('most blogs', () => {
  const emptyList = []
  const singleElementList = [
    {
      _id: '123123123',
      title: 'test1',
      author: 'author1',
      url: 'http://example.com/1',
      likes: 4,
      __v: 0
    }
  ]
  const multipleBlogsList = [
    {
      _id: '321321312',
      title: 'test1',
      author: 'author1',
      url: 'http://example.com/1',
      likes: 4,
      __v: 0
    },
    {
      _id: '123123123',
      title: 'test2',
      author: 'author2',
      url: 'http://example.com/2',
      likes: 6,
      __v: 0
    },
    {
      _id: '543453453453',
      title: 'test3',
      author: 'author1',
      url: 'http://example.com/3',
      likes: 5,
      __v: 0
    }
  ]
  const multipleUniqueBlogsList = [
    {
      _id: '321321312',
      title: 'test1',
      author: 'author1',
      url: 'http://example.com/1',
      likes: 4,
      __v: 0
    },
    {
      _id: '123123123',
      title: 'test2',
      author: 'author2',
      url: 'http://example.com/2',
      likes: 6,
      __v: 0
    },
    {
      _id: '543453453453',
      title: 'test3',
      author: 'author3',
      url: 'http://example.com/3',
      likes: 5,
      __v: 0
    }
  ]

  test('of an empty list is an empty element', () => {
    expect(listHelper.mostBlogs(emptyList)).toEqual({})
  })
  test('of a list with single element is its author', () => {
    expect(listHelper.mostBlogs(singleElementList)).toEqual({ author1: 1 })
  })
  test('of a list with multiple elements is correct', () => {
    expect(listHelper.mostBlogs(multipleBlogsList)).toEqual({ author1: 2 })
  })
  test('of a list with multiple elements with unique authors is correct', () => {
    expect(listHelper.mostBlogs(multipleUniqueBlogsList)).toEqual({ author1: 1 })
  })
})
*/

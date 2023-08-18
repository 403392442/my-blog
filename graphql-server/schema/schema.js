const Users = require('../models/Users');
const Blogs = require('../models/Blogs');
const Comments = require('../models/Comments');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLString, GraphQLInt
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: {type: GraphQLString},
        password: {type: GraphQLString},
    })
});

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: {type: GraphQLID},
        postId: {type: GraphQLID},
        user: {type: GraphQLString},
        text: {type: GraphQLString},
        date: {type: GraphQLString},
    })
})

const BlogsType = new GraphQLObjectType({
    name: 'Blogs',
    fields: () => ({
        id: {type: GraphQLID},
        author: {type: GraphQLString},
        title: {type: GraphQLString},
        date: {type: GraphQLString},
        content: {type: GraphQLString},
        commentsAmount: {type: GraphQLInt},
    })
})

const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        id: {type: GraphQLID},
        author: {type: GraphQLString},
        title: {type: GraphQLString},
        date: {type: GraphQLString},
        content: {type: GraphQLString},
        comments: {
            type: GraphQLList(CommentType),
            resolve(parent, args) {
                return Comments.find({postId: parent._id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUser: {
            type: UserType,
            args: {
                username: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parent, args) {
                return Users.findOne({username: args.username, password: args.password});
            }
        },
        getBlogs: {
            type: new GraphQLList(BlogsType),
            async resolve(parent, args) {
                return Blogs.find()
            }
        },
        getBlog: {
            type: BlogType,
            args: {
                postId: {type: GraphQLID},
            },
            resolve(parent, args) {
                return Blogs.findById(args.postId)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: {type: GraphQLString},
                password: {type: GraphQLString},
                confirmPassword: {type: GraphQLString},
            },
            resolve(parent, args) {
                if (args.password === args.confirmPassword) {
                    const user = new Users({
                        username: args.username,
                        password: args.password,
                    })
                    return user.save();
                }
            }
        },
        addBlog: {
            type: BlogsType,
            args: {
                author: {type: GraphQLString},
                title: {type: GraphQLString},
                content: {type: GraphQLString},
            },
            resolve(parent, args) {
                const blog = new Blogs({
                    author: args.author,
                    title: args.title,
                    content: args.content,
                    comments: [],
                    commentsAmount: 0,
                })
                return blog.save()
            }
        },
        addComment: {
            type: CommentType,
            args: {
                postId: {type: GraphQLID},
                user: {type: GraphQLString},
                text: {type: GraphQLString},
                commentsAmount: {type: GraphQLInt},
            },
            async resolve(parent, args) {
                const comment = new Comments({
                    postId: args.postId,
                    user: args.user,
                    text: args.text,
                })
                await Blogs.findByIdAndUpdate(args.postId, {
                    commentsAmount: args.commentsAmount + 1,
                })
                return comment.save();
            }
        },
        deleteComment: {
            type: CommentType,
            args: {
                id: {type: GraphQLID},
                commentsAmount: {type: GraphQLInt},
                postId: {type: GraphQLID},
            },
            async resolve(parent, args) {
                await Blogs.findByIdAndUpdate(args.postId, {
                    commentsAmount: args.commentsAmount - 1,
                })
                return Comments.findByIdAndDelete(args.id)
            }
        },
        updateComment: {
            type: CommentType,
            args: {
                id: {type: GraphQLID},
                text: {type: GraphQLString},
            },
            resolve(parent, args) {
                return Comments.findByIdAndUpdate(args.id, {
                    $set: {
                        text: args.text,
                        date: Date.now(),
                        },
                    },
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
})
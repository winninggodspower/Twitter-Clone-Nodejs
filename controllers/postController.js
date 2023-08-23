const Post = require('../models/post');
const TimeAgo = require('javascript-time-ago');


// timeago configuration
const  en = require('javascript-time-ago/locale/en');
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const post_index =  (req, res)=>{
    Post.find()
    .populate('user')
    .sort({createdAt: -1})
    .exec()
    .then(result=>{
        // format the time before rendering
        result = result.map(post => ({ ...post._doc, createdAt: timeAgo.format(post.createdAt) }))
        
        res.render('index', { posts: result, user: req.user })
    })
    .catch(error=>{
        console.log(error);
        res.send()
    })
}

const post_create = (req, res)=>{    
    let post = new Post({ 
        content: req.body.content,
        user: req.user.user_id 
    });

    post.save()
    .then((result)=>{
        res.redirect('/')
    })
    .catch((error)=>{
        console.log(error);
    })
}

module.exports = {
    post_index,
    post_create,
}
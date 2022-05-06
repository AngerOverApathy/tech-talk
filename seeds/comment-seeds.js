const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 3,
        comment_text: "I love how you wrote that!"
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "Very cool idea."
    },
    {
        user_id: 1,
        post_id: 3,
        comment_text: "Not a fan."
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "This is fine."
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "Nobody asked."
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "Wow!"
    },
    {
        user_id: 2,
        post_id: 3,
        comment_text: "Much good. Very nice."
    },
    {
        user_id: 2,
        post_id: 1,
        comment_text: "First"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
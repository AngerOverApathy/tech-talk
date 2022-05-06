const { Post } = require('../models');

const postData = [{
        title: 'Making Banana Bread',
        post_text: 'Use brown bananas. Mash three in a bowl. Add your wet and dry ingredients.',
        user_id: 1

    },
    {
        title: 'I Have 3 Sons',
        post_text: 'They all have the same name.',
        user_id: 2
    },
    {
        title: 'Building Boats',
        post_text: 'It is difficult.',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
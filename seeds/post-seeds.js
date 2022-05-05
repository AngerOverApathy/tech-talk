const { Post } = require('../models');

const postData = [{
        title: 'Making Banana Bread',
        content: 'Use brown bananas. Mash three in a bowl. Add your wet and dry ingredients.',
        user_id: 1

    },
    {
        title: 'I Have 3 Sons',
        content: 'They all have the same name.',
        user_id: 2
    },
    {
        title: 'Building Boats',
        content: 'It is difficult.',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
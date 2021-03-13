import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    // function find need time to run, and because of that
    // we need to set await in front of that function
    // and than async in front (req, res)
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    //from frontend side, we retrieve post with req.body
    //and than that body(whole post data from frontend)
    //pass as a parameter to PostMessage object(class)
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
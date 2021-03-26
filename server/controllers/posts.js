//import mongoose from 'mongoose';
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

    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//izvlacimo id iz na primer /post/123
// i postavljamo polje sa id na _id
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    // if(!mongoose.Types.ObjectId.isValid(_id)) {
    //     return res.status(404).send('No post with that id.');
    // }

    //new:true znaci da vrati taj azuriran objekat

    //ranije bismo ovako poslali samo post
    //const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    //ali problem nastaje, jer mi sa frontenda saljemo post objekat koji nema id
    //umesto toga radimo sledecu stvar
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    //u auth.js smo izvukli req.userId
    //a u routes smo prosledili auth, likePost
    //tako da ga ovde mozemo iskoristiti
    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    const post = await PostMessage.findById(id);

    //proveravamo da li je ta neka osoba vec lajkovala post
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        //like the post
        post.likes.push(req.userId);
    } else {
        //dislike
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}
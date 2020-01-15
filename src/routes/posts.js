const { Router } = require('express');
const router = Router();
const postModel = require('../models/posts');

router.get("/", async (request, response) => {
    const postList = await postModel.find({});
    response.json(postList);
});

router.post("/", (request, response) => {
    const { title, content } = request.body;
    if(title && content) {
        const newPost = new postModel({ ...request.body });
        newPost.save().then(() => console.log("Post guardado"));
        response.json(newPost);
    } else {
        response.send("Datos incorrectos");
    }
});

module.exports = router;
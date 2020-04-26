const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

//get all the members
router.get("/", (req, res) => {
    res.json(members);
});

//get individual members
router.get("/:id", (req, res) => {
    let found = members.some((member) => member.id === parseInt(req.params.id));
    if (found)
        res.json(members.filter((member) => member.id === parseInt(req.params.id)));
    else res.status(400).json({ msg: `No member with id ${req.params.id}` });
});

//create member

router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
    };

    if (!newMember.name || !newMember.age) {
        return res.status(400).json({ msg: `Please include name and age` });
    }
    members.push(newMember);
    res.json(members);
});

//update member

router.put("/:id", (req, res) => {
    let found = members.some((member) => member.id === parseInt(req.params.id));
    if (found) {
        const updMember = req.body;
        members.forEach((member) => {
            if (member.id === parseInt(req.body.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.age = updMember.age ? updMember.age : member.age;
                res.json(member);
            }
        });
    } else res.status(400).json({ msg: `No member with id ${req.params.id}` });
});

//delete member
router.delete("/:id", (req, res) => {
    let found = members.some((member) => member.id === parseInt(req.params.id));
    if (found)
        res.json({
            msg: "member deleted",
            members: members.filter(
                (member) => member.id !== parseInt(req.params.id)
            ),
        });
    else res.status(400).json({ msg: `No member with id ${req.params.id}` });
});

module.exports = router;

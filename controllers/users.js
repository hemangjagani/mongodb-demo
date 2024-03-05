const { User } = require("../models");

exports.createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!!user) {
     res.status(400).send("User already exist!");
    } else {
        const userDetails = await User.create({
          email,
          password,
          name,
        });
    
        if(!!userDetails) {
            await userDetails.createCart();
            // Remove the password field from the userDetails object
            const responseDetails = { ...userDetails.dataValues };
            delete responseDetails.password;
        
            res.status(201).send(responseDetails);
        }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

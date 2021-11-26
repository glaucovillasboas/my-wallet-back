import * as userSchema from '../schemas/user.schema.js';
import * as userService from '../services/user.service.js';

const signUp = async (req, res) => {
  if (userSchema.signUp.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const user = await userService.createUser(req.body);

  if (user === null) {
    return res.sendStatus(409);
  }

  if (user.length === 0) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
};

const signIn = async (req, res) => {
  if (userSchema.signIn.validate(req.body).error) {
    return res.sendStatus(400);
  }

  const user = await userService.createSession(req.body);

  if (user === null) {
    return res.sendStatus(401);
  }

  if (!user.token) {
    return res.sendStatus(500);
  }

  return res.send({
    token: user.token,
  });
};

export {
  signUp,
  signIn,
};

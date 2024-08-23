const Voter = require("../model/voter");
registerVoter = async (req, res) => {
  console.log("registerVoter function called");

  const { name, passportNumber, dateOfBirth } = req.body;
  console.log(
    `Received request to register voter with passport number:${name} ${dateOfBirth} ${passportNumber}`
  );

  const voter = await Voter.findOne({
    name: name,
    passportNumber: passportNumber,
    dateOfBirth: dateOfBirth,
  });
  if (voter) {
    res.send({ verified: true });
  } else {
    res.send({ verified: false });
  }
};
module.exports = { registerVoter };

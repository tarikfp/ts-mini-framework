import { User } from "./Models/User";

const user = User.initializeUser({ id: 1, name: "TarikUpdated", age: 32 });
const userCollection = User.initializeUserCollection();

user.on("onSave", () => {
  console.log("onSave=>", user);
});

userCollection.on("onChange", () => {
  console.log("onChange=>", userCollection);
});
userCollection.fetch();
user.save();

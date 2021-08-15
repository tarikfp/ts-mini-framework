import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<IUserProps> {
  public static initializeUser(attrs: IUserProps): User {
    return new User(
      new Attributes<IUserProps>(attrs),
      new Eventing(),
      new ApiSync<IUserProps>(rootUrl)
    );
  }

  public static initializeUserCollection(): Collection<User, IUserProps> {
    return new Collection<User, IUserProps>(rootUrl, (json) =>
      this.initializeUser(json)
    );
  }
}

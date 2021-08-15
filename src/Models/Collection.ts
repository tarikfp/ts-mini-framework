import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

export class Collection<T, K> {
  public models: T[] = [];
  public events: Eventing = new Eventing();
  public constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  public fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) =>
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      })
    );
    this.trigger("onChange");
  }
}

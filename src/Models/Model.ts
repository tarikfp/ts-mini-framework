import { Attributes } from "./Attributes";
import { ApiSync, hasId } from "./ApiSync";
import { Eventing } from "./Eventing";
import { AxiosResponse } from "axios";

export class Model<T extends hasId> {
  public constructor(
    private attributes: Attributes<T>,
    private eventing: Eventing,
    private apiSync: ApiSync<T>
  ) {}

  get get() {
    return this.attributes.get;
  }
  get set() {
    return this.attributes.set;
  }
  get on() {
    return this.eventing.on;
  }
  get trigger() {
    return this.eventing.trigger;
  }

  public getById(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    this.apiSync.getById(id).then((response: AxiosResponse) => {
      this.set(response.data);
    });
  }

  public save(): void {
    this.apiSync
      .save(this.attributes.getAll())
      .then((): void => {
        this.trigger("onSave");
      })
      .catch(() => this.trigger("onError"));
  }
}
